import { mapKeys, camelCase } from 'lodash';

export function cleanObject(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
}

export function snakeCaseToCamelCase(data: object): object {
  return mapKeys(data, (value, key) => camelCase(key));
}
