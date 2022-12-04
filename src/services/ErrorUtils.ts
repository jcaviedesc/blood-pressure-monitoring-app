export const parseError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(JSON.stringify(error));
};

export function getErrorMessage(err: unknown) {
  const error = parseError(err);
  return error.message;
}
