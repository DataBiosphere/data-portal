/**
 * Return the value for the specified key.
 * @param key - Key.
 * @returns value.
 */
export function getLocalStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window?.localStorage?.getItem(key) ?? null;
}

/**
 * Set the value for the specified key.
 * @param key - Key.
 * @param value - Value.
 */
export function setLocalStorage(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window?.localStorage?.setItem(key, value);
}
