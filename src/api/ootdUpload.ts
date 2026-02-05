import {
  getPresignedUrls,
  uploadToPresignedUrl,
  imageSourceToBlob,
} from "@/api/presignedUrl";
import type { OotdCanvasItem } from "@/types/ootd";

const OOTD_PRESIGNED_PATH = "/api/ootd/presigned-urls";

export async function uploadOotdImagesAndGetUrls(
  items: OotdCanvasItem[]
): Promise<OotdCanvasItem[]> {
  const urls = await getPresignedUrls(OOTD_PRESIGNED_PATH, {
    count: items.length,
  });
  if (urls.length === 0) return items;
  if (urls.length < items.length) {
    throw new Error(
      `presigned URL 부족: 요청 ${items.length}개, 수신 ${urls.length}개. 모든 아이템을 업로드할 수 없습니다.`
    );
  }

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
      console.warn(`아이템 ${i} 업로드 실패: blob=${!!blob}, url=${!!urls[i]}`);
      result.push(item);
    }
  }
  return result;
}
