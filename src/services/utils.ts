import camelcaseKeysDeep from 'camelcase-keys-deep';
import snakecaseKeys from 'snakecase-keys';

export function cleanObject(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => {
      if (Array.isArray(v) && v.length < 1) {
        return false;
      }
      return v !== '';
    }),
  );
}

export function snakeCaseToCamelCase<T>(data: any) {
  if (Array.isArray(data)) {
    return data.map(item => camelcaseKeysDeep(item));
  }

  return camelcaseKeysDeep(data);
}

export function camelCaseKeysToUnderscore(data: object) {
  if (typeof data !== 'object') {
    return data;
  }
  return snakecaseKeys(data);
}

export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export function getAverage<T>(
  data: T[],
  keyAvgs: (keyof T)[],
): { [k in keyof T]: number } {
  const initialObj = keyAvgs.reduce((prev, curr) => {
    prev[curr] = 0;
    return prev;
  }, {});

  const sumKeyAvg = data.reduce((prev, curr) => {
    keyAvgs.forEach(key => {
      prev[key] = prev[key] + curr[key];
    });
    return prev;
  }, initialObj);

  keyAvgs.forEach(key => {
    const average = Number(sumKeyAvg[key] / data.length);
    sumKeyAvg[key] = Math.round((average + Number.EPSILON) * 100) / 100;
  });

  return sumKeyAvg;
}
