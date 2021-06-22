export function lStorage(key: string, data: any = null): any {
  if (!data) {
    return JSON.parse(localStorage.getItem(key)!);
  }
  localStorage.setItem(key, JSON.stringify(data));
}
