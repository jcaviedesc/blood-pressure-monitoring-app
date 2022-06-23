import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useColorScheme,
  Platform,
} from 'react-native';
import { Colors, Fonts } from '../../styles';

type InputProps = {
  textInputRef?: React.LegacyRef<TextInput>;
  title?: string;
  onFocus?: Function;
  editable?: boolean;
  value?: string;
  showSoftInputOnFocus?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: ((text: string) => void) | undefined;
  hint?: string;
  rigthComponent?: Element;
  autoFocus?: boolean;
  hasError?: boolean;
  leftComponent?: Element;
  hierarchy?: 'loud' | 'quiet' | 'transparent';
};

const Input: React.FC<InputProps> = ({
  textInputRef,
  title,
  onFocus,
  editable,
  value,
  showSoftInputOnFocus,
  placeholder,
  keyboardType,
  onChangeText,
  hint,
  rigthComponent,
  autoFocus,
  hasError = false,
  leftComponent,
  hierarchy,
  ...props
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onFocuesHandler = () => {
    onFocus && onFocus();
  };
  let inputContainerStyles = {
    ...styles.inputContainer,
    backgroundColor: isDarkMode ? Colors.darkGrayMode : Colors.lightGray,
    borderColor: isDarkMode
      ? Colors.darkGrayMode
      : hasError
        ? Colors.error
        : Colors.lightGray,
  };
  if (hierarchy === 'transparent') {
    inputContainerStyles = {
      ...inputContainerStyles,
      borderWidth: 0,
      backgroundColor: Colors.transparent,
    };
  }

  return (
    <View>
      {title && (
        <Text
          style={{
            ...styles.inputTitle,
            color: isDarkMode ? Colors.darkGrayMode : Colors.paragraph,
          }}>
          {title}
        </Text>
      )}
      <View style={inputContainerStyles}>
        {leftComponent}
        <TextInput
          {...props}
          ref={textInputRef}
          style={styles.input}
          onFocus={onFocuesHandler}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
        />
        {rigthComponent}
      </View>
      {hint && (
        <Text
          style={{
            ...styles.hint,
            color: isDarkMode ? Colors.darkGrayMode : Colors.paragraph,
          }}>
          {hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginLeft: 3,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
  },
  inputContainer: {
    height: Platform.OS === 'android' ? 48 : 42,
    minHeight: Platform.OS === 'android' ? 48 : 42,
    flexDirection: 'row',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default Input;
