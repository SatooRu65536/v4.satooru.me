export function saveToLocalStorage(key: string, data: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage(key: string): unknown {
  if (typeof window === 'undefined') return null;

  const item = localStorage.getItem(key);
  if (!item) return null;

  return JSON.parse(item);
}
