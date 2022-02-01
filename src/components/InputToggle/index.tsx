import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { Colors, Fonts } from '../../styles';

type option = {
  label: string;
  value: string;
};

type Props = {
  options: Array<option>;
  onPress: (option: option) => void;
  selected?: string;
};

const InputToggle: React.FC<Props> = ({ options, selected, onPress }) => {
  const [selectOpt, setSelectOpt] = useState(selected);
  return (
    <View style={styles.container}>
      {options.map(({ label, value }) => (
        <TouchableHighlight
          key={value}
          underlayColor={Colors.transparent}
          style={[
            styles.touchableHighlight,
            value === selectOpt ? styles.optionSelected : {},
          ]}
          onPress={() => {
            setSelectOpt(value);
            onPress({ label, value });
          }}>
          <Text
            style={[
              styles.optionText,
              value === selectOpt ? styles.optionSelectedText : {},
            ]}>
            {label}
          </Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    flexDirection: 'row',
    borderRadius: 5,
    height: 48,
    padding: 6,
    flex: 1,
  },
  touchableHighlight: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: Colors.button,
    borderRadius: 5,
  },
  optionText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.paragraph,
  },
  optionSelectedText: {
    color: Colors.buttonText,
  },
});

export default InputToggle;
