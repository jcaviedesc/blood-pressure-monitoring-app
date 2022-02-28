export function cleanObject(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
}
