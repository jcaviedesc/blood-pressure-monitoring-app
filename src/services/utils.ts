import { mapKeys, camelCase, snakeCase } from 'lodash';

export function cleanObject(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''));
}

export function snakeCaseToCamelCase(data: object): object {
  return mapKeys(data, (value, key) => camelCase(key));
}

export function camelCaseKeysToUnderscore(obj: object) {
  if (typeof obj !== 'object') return obj;

  const data = obj;
  for (var oldName in data) {
    // Camel to underscore
    const newName = snakeCase(oldName);

    // Only process if names are different
    if (newName !== oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      data[newName] = data[oldName];
      delete data[oldName];
    }

    // Recursion
    if (typeof data[newName] === 'object') {
      data[newName] = camelCaseKeysToUnderscore(data[newName]);
    }
  }
  return data;
}

