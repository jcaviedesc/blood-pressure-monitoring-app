import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  width: string | number;
};

export const SideEmpty: React.FC<Props> = ({ width }) => {
  return <View style={{ ...styles.sideEmpty, width }} />;
};

const styles = StyleSheet.create({
  sideEmpty: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: '100%',
  },
});
