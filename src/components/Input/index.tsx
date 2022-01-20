import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useColorScheme,
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
  onChangeText?: ((text: string) => void) | undefined;
};

const Input: React.FC<InputProps> = ({
  title,
  onFocus,
  editable,
  value,
  showSoftInputOnFocus,
  placeholder,
  keyboardType,
  onChangeText,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onFocuesHandler = () => {
    onFocus && onFocus();
  };
  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={{
            ...styles.inputTitle,
            color: isDarkMode ? Colors.darkGrayMode : Colors.paragraph,
          }}>
          {title}
        </Text>
      )}
      <View
        style={{
          ...styles.inputContainer,
          backgroundColor: isDarkMode ? Colors.darkGrayMode : Colors.lightGray,
          borderColor: isDarkMode ? Colors.darkGrayMode : Colors.lightGray,
        }}>
        <TextInput
          style={styles.input}
          onFocus={onFocuesHandler}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
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
    fontSize: Fonts.size.h5,
  },
  inputContainer: {
    borderColor: Colors.lightGray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 9,
  },
  input: {
    height: 48,
    paddingTop: 12,
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
});

export default Input;
