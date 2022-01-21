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
  hint?: string;
  rigthComponent?: Element;
  autoFocus?: boolean;
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
  hint,
  rigthComponent,
  autoFocus,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onFocuesHandler = () => {
    onFocus && onFocus();
  };
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
          autoFocus={autoFocus}
        />
        {rigthComponent}
      </View>
      {hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginLeft: 3,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    borderColor: Colors.lightGray,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 9,
    paddingRight: 9,
  },
  input: {
    flex: 1,
    paddingTop: 12,
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default Input;
