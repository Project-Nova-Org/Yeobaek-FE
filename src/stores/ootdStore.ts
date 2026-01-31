import type { SavedOotd } from "@/types/ootd";

/** 앱 내 저장 OOTD 목록 (메모리, 추후 AsyncStorage 연동 가능) */
let savedOotds: SavedOotd[] = [];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((cb) => cb());
}

export function getOotdList(): SavedOotd[] {
  return [...savedOotds];
}

export function getOotdById(ootdId: string): SavedOotd | undefined {
  return savedOotds.find((o) => o.id === ootdId);
}

export function saveOotd(
  ootd: Omit<SavedOotd, "id" | "createdAt">
): SavedOotd {
  const newOne: SavedOotd = {
    ...ootd,
    isFavorite: ootd.isFavorite ?? false,
    id: `ootd-${Date.now()}`,
    createdAt: Date.now(),
  };
  savedOotds = [newOne, ...savedOotds];
  notify();
  return newOne;
}

export function toggleOotdFavorite(ootdId: string): void {
  const o = savedOotds.find((x) => x.id === ootdId);
  if (o) {
    o.isFavorite = !o.isFavorite;
    notify();
  }
}

export function deleteOotd(ootdId: string): void {
  savedOotds = savedOotds.filter((o) => o.id !== ootdId);
  notify();
}

export function updateOotd(
  ootdId: string,
  payload: Partial<
    Pick<SavedOotd, "name" | "tpo" | "style" | "memo" | "items" | "canvasSize" | "imageBgColor">
  >
): void {
  const o = savedOotds.find((x) => x.id === ootdId);
  if (o) {
    if (payload.name !== undefined) o.name = payload.name;
    if (payload.tpo !== undefined) o.tpo = payload.tpo;
    if (payload.style !== undefined) o.style = payload.style;
    if (payload.memo !== undefined) o.memo = payload.memo;
    if (payload.items !== undefined) o.items = payload.items;
    if (payload.canvasSize !== undefined) o.canvasSize = payload.canvasSize;
    if (payload.imageBgColor !== undefined) o.imageBgColor = payload.imageBgColor;
    notify();
  }
}

export function subscribeOotdList(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
