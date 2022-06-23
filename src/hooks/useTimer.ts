import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useTimer hook to make custom Countdown
 * @param repeatEvery frecuency or speed of timer
 * @param countDown number to begin countdown
 * @param reset reset countdown to initialstate
 *
 * @return timer
 */
export const useTimer = (repeatEvery: number, countDown: number) => {
  const [timer, seTimer] = useState(countDown);
  const [reset, setReset] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      seTimer(prevTimer => prevTimer - 1);
    }, repeatEvery - 200);
  }, [repeatEvery, reset]);

  useEffect(() => {
    if (timerRef.current && timer <= 0) {
      clearInterval(timerRef.current);
    }
  }, [timer]);

  const resetTimer = useCallback(() => {
    seTimer(countDown);
    setReset(prevReset => prevReset + 1);
  }, [countDown]);

  return { timer, resetTimer };
};
