import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useColorScheme,
  Platform,
} from 'react-native';
import { Colors, Fonts } from '../../styles';
import { Text } from '../CustomText';

export type InputProps = {
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
  };

  if (hierarchy === 'transparent') {
    inputContainerStyles = {
      ...inputContainerStyles,
      backgroundColor: Colors.transparent,
    };
  }

  return (
    <View style={styles.mainInputContainer}>
      {title && <Text style={styles.inputTitle}>{title}</Text>}
      <View style={inputContainerStyles}>
        {leftComponent}
        <TextInput
          {...props}
          ref={textInputRef}
          style={[
            styles.input,
            { color: isDarkMode ? Colors.textNormal : Colors.headline },
          ]}
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
          style={[
            styles.hint,
            { color: hasError ? Colors.error : Colors.paragraph },
          ]}>
          {hint}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    color: Colors.headline,
    marginLeft: 3,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
  },
  inputContainer: {
    height: Platform.OS === 'android' ? 48 : 40,
    flexDirection: 'row',
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 6,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.type.semiBold,
    fontSize: Platform.OS === 'android' ? Fonts.size.h6 : Fonts.size.paragraph,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
  mainInputContainer: {
    marginBottom: 9,
  },
});

export default Input;
