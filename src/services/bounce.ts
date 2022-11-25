let timeRef: string | number | NodeJS.Timeout | undefined;
export function debounce(callBack: () => void, ms?: number) {
  if (!timeRef) {
    timeRef = setTimeout(callBack, ms);
  } else {
    clearTimeout(timeRef);
    timeRef = setTimeout(callBack, ms);
  }
}
