export function pick<T, K extends keyof T>(source: T, keys: readonly K[]) {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => (result[key] = source[key]));
  return result;
}
