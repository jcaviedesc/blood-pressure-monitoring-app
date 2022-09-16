export const parseError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(JSON.stringify(error));
};
