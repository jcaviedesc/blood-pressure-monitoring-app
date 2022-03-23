import React from 'react';
import { VirtualKeyboard } from 'react-native-screen-keyboard';
import { StyleSheet, View } from 'react-native';

type props = {
  onKeyDown: (num: string) => void;
};

const NumericVirtualKeyboard: React.FC<props> = ({ onKeyDown }) => {
  return (
    <View style={styles.container}>
      <VirtualKeyboard onKeyDown={onKeyDown} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});

export default NumericVirtualKeyboard;
