import { API_BASE } from "@/constants/api";

/** presigned URL 응답 한 건 (업로드용) */
export interface PresignedUrlEntry {
  /** PUT 업로드에 사용할 URL */
  uploadUrl: string;
  /** 업로드 완료 후 사용할 최종 리소스 URL (저장/표시용) */
  imageUrl: string;
  /** (선택) GET 다운로드용 URL. 없으면 imageUrl로 다운로드 */
  downloadUrl?: string;
}

/** presigned URL 요청 공통 */
export interface PresignedUrlRequest {
  count: number;
  fileNames?: string[];
  /** 도메인별 추가 옵션 */
  [key: string]: unknown;
}

/** presigned URL 응답 공통 */
export interface PresignedUrlResponse {
  urls: PresignedUrlEntry[];
}

/**
 * presigned URL 목록 발급 (공통)
 * @param apiPath - 예: "/api/ootd/presigned-urls", "/api/calendar/presigned-urls"
 */
export async function getPresignedUrls(
  apiPath: string,
  body: PresignedUrlRequest
): Promise<PresignedUrlEntry[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}${apiPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`presigned URL 요청 실패: ${res.status}`);
  const data = (await res.json()) as PresignedUrlResponse;
  return data.urls ?? [];
}

/**
 * presigned URL로 업로드 (PUT, 공통)
 */
export async function uploadToPresignedUrl(
  uploadUrl: string,
  blob: Blob,
  contentType?: string
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType || blob.type || "image/png" },
    body: blob,
  });
  if (!res.ok) throw new Error(`업로드 실패: ${res.status}`);
}

/**
 * presigned(또는 공개) URL에서 다운로드 (GET, 공통)
 */
export async function downloadFromUrl(url: string): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`다운로드 실패: ${res.status}`);
  return res.blob();
}

/**
 * 이미지 소스(uri 또는 require)를 Blob으로 변환 (공통 유틸)
 */
export async function imageSourceToBlob(image: unknown): Promise<Blob | null> {
  if (
    image &&
    typeof image === "object" &&
    "uri" in image &&
    typeof (image as { uri: string }).uri === "string"
  ) {
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
