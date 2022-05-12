import React from 'react';
import { Text } from 'react-native';
import { Fonts } from '../../styles';

const HeaderTitle = ({
  children,
  tintColor,
}: {
  children: string;
  tintColor?: string | undefined;
}) => {
  return (
    <Text style={{ color: tintColor, ...Fonts.style.h6 }}>{children}</Text>
  );
};

export default HeaderTitle;
