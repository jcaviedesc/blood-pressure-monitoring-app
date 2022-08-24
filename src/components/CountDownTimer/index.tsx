import React, { useRef } from 'react';
import { Text, TextStyle } from 'react-native';
import { useCountdown } from '../../hooks/useTimer';

type Props = {
  timerMilliseconds: number;
  expiredTimeComponent: React.ReactNode;
  prefix?: string;
  onFinish?: () => void;
  textStyles?: TextStyle;
};

export const CountDownTimer = ({
  timerMilliseconds,
  expiredTimeComponent,
  prefix,
  onFinish = () => { },
  textStyles,
}: Props): JSX.Element => {
  const NOW_IN_MS = useRef(new Date().getTime()).current;
  const [days, hours, minutes, seconds] = useCountdown(
    NOW_IN_MS + timerMilliseconds,
  );
  if (days + hours + minutes + seconds <= 0) {
    onFinish();
    return <Text>{expiredTimeComponent}</Text>;
  } else {
    return <Text style={textStyles}>{`${prefix}${minutes}:${seconds}`}</Text>;
  }
};
