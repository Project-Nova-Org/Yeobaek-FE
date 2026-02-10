import type { ClosetItem } from "@/screens/Dressroom/dressroom.mock";
import { MOCK_CLOSETS } from "@/screens/Dressroom/dressroom.mock";

let closets: ClosetItem[] = [...MOCK_CLOSETS];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((cb) => {
    cb();
  });
}

export function getClosetList(): ClosetItem[] {
  return [...closets];
}

export function getClosetById(id: number): ClosetItem | undefined {
  return closets.find((c) => c.id === id);
}

export function getFavoriteClosets(): ClosetItem[] {
  return closets.filter((c) => c.isFavorite);
}

export function toggleClosetFavorite(id: number): void {
  const c = closets.find((x) => x.id === id);
  if (c) {
    c.isFavorite = !c.isFavorite;
    notify();
  }
}

export function setClosetList(next: ClosetItem[] | ((prev: ClosetItem[]) => ClosetItem[])): void {
  closets = typeof next === "function" ? next(closets) : next;
  notify();
}

export function subscribeClosetList(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
