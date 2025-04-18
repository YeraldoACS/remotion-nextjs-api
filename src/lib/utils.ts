export const mapToObject = <T>(map: Map<string, T>): { [key: string]: T } => {
  return Object.fromEntries(map.entries());
};

export function mapToArray<K, V>(map: Map<K, V>): [K, V][] {
  return Array.from(map);
}

export function objectToArray<T>(obj: { [key: string]: T }): T[] {
  return Object.values(obj);
}

export const READABLE_DATE_FORMAT = "MMMM dd, yyyy";
