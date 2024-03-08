import { MOST_RECENT_REASON_INDEX_LOCAL_STORAGE_KEY, MS_BETWEEN_REASONS, NEXT_REASON_UNLOCK_DATETIME_LOCAL_STORAGE_KEY } from "./constants";

export const getLocalStorage = (key: string, init: number) => {
  const localStorageValue: string | null = localStorage.getItem(key);
  if (localStorageValue === null) {
    localStorage.setItem(key, init.toString());
    return 0;
  }
  return parseInt(localStorageValue);
};

export const reasons: string[] = import.meta.env.VITE_REASONS.split("\n").filter((s: string) => s !== '');

export const timeDiffStr = (currTime: number, unlockTime: number) => {
  const time = (unlockTime - currTime) / 1000;
  const hours = String(Math.floor(time / 60 / 60)).padStart(2, "0");
  const minutes = String(Math.floor(time / 60 % 60)).padStart(2, "0");
  const seconds = String(Math.floor(time % 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const getReasonIdx = () => getLocalStorage(MOST_RECENT_REASON_INDEX_LOCAL_STORAGE_KEY, 0);
export const getUnlockTime = () => getLocalStorage(NEXT_REASON_UNLOCK_DATETIME_LOCAL_STORAGE_KEY, new Date().getTime() + MS_BETWEEN_REASONS);
