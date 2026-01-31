
import type { OotdCanvasItem } from "@/types/ootd";

/** 백엔드 presigned URL 응답 한 건 */
export interface PresignedUrlEntry {
  /** PUT 업로드에 사용할 URL */
  uploadUrl: string;
  /** 업로드 완료 후 사용할 최종 이미지 URL (저장용) */
  imageUrl: string;
}

/** presigned URL 요청 (백엔드 스펙에 맞게 수정) */
export interface PresignedUrlRequest {
  count: number;
  /** 파일 확장자 등 메타 있을 경우 */
  fileNames?: string[];
}

/** presigned URL 응답 */
export interface PresignedUrlResponse {
  urls: PresignedUrlEntry[];
}

const API_BASE = ""; // TODO: 환경변수 또는 constants로 설정 (예: process.env.API_BASE)

export async function getPresignedUrls(count: number): Promise<PresignedUrlEntry[]> {
  if (!API_BASE) {
    // 백엔드 미연동 시 빈 배열 반환 → 업로드 스킵 후 기존 데이터로 저장
    return [];
  }
  const res = await fetch(`${API_BASE}/api/ootd/presigned-urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count } as PresignedUrlRequest),
  });
  if (!res.ok) throw new Error(`presigned URL 요청 실패: ${res.status}`);
  const data = (await res.json()) as PresignedUrlResponse;
  return data.urls ?? [];
}

export async function uploadToPresignedUrl(uploadUrl: string, blob: Blob): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": blob.type || "image/png" },
    body: blob,
  });
  if (!res.ok) throw new Error(`이미지 업로드 실패: ${res.status}`);
}

/**
 * 이미지 소스(uri 또는 require)를 Blob으로 변환
 */
export async function imageSourceToBlob(image: unknown): Promise<Blob | null> {
  if (image && typeof image === "object" && "uri" in image && typeof (image as { uri: string }).uri === "string") {
    const uri = (image as { uri: string }).uri;
    try {
      const res = await fetch(uri);
      if (!res.ok) return null;
      return await res.blob();
    } catch {
      return null;
    }
  }
  return null;
}

export async function uploadOotdImagesAndGetUrls(
  items: OotdCanvasItem[]
): Promise<OotdCanvasItem[]> {
  const urls = await getPresignedUrls(items.length);
  if (urls.length === 0) return items;

  const result: OotdCanvasItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const blob = await imageSourceToBlob(item.image);
    if (blob && urls[i]) {
      await uploadToPresignedUrl(urls[i].uploadUrl, blob);
      result.push({
        ...item,
        image: { uri: urls[i].imageUrl },
      });
    } else {
      result.push(item);
    }
  }
  return result;
}
