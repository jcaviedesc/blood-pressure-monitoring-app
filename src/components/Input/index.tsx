import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { Colors, Fonts } from '../../styles';

type InputProps = {
  title?: string;
  onFocus?: Function;
  editable?: boolean;
  value?: string;
  showSoftInputOnFocus?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
};

const Input: React.FC<InputProps> = ({
  title,
  onFocus,
  editable,
  value,
  showSoftInputOnFocus,
  placeholder,
  keyboardType,
}) => {
  const onFocuesHandler = () => {
    onFocus && onFocus();
  };
  return (
    <View style={styles.container}>
      {title && <Text style={styles.inputTitle}>{title}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onFocus={onFocuesHandler}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputTitle: {
    marginLeft: 3,
    fontWeight: '600',
    fontFamily: Fonts.type.light,
    fontSize: 19,
  },
  inputContainer: {
    borderColor: Colors.lightGray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 0.8,
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 9,
  },
  input: {
    height: 48,
    paddingTop: 12,
    color: Colors.primaryText,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
});

export default Input;
