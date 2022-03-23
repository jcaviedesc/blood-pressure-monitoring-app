import React from 'react';
import { VirtualKeyboard } from 'react-native-screen-keyboard';
import { StyleSheet, View } from 'react-native';

type props = {
  onChange: (num: string) => void;
};

const NumericVirtualKeyboard: React.FC<props> = ({ onChange }) => {
  return (
    <View style={styles.container}>
      <VirtualKeyboard onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});

export default NumericVirtualKeyboard;
