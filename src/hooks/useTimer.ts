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

const useCountdown = (targetDate: number) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [countDownDate]);

  if (countDown <= 0) {
    clearInterval(intervalRef.current as NodeJS.Timeout);
  }

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
