import React, { useRef } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Colors, Fonts } from '../../styles';

type PhoneInputProps = {
  title?: string;
  initialCountry: string;
  value: string;
  onPhoneInputChange: (number: string) => void;
  autoFocus?: boolean;
  error: string | undefined;
};

type PhoneInputRef = {
  isValidNumber: (number: string) => boolean;
  getCallingCode: () => string;
};

const PhoneInputWrapper: React.FC<PhoneInputProps> = ({
  title,
  initialCountry,
  value,
  onPhoneInputChange,
  autoFocus,
  error,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const ref = useRef<PhoneInputRef>();

  const onChangePhoneNumberHandler = (phoneNumber: string) => {
    if (ref.current?.isValidNumber(phoneNumber)) {
      onPhoneInputChange(phoneNumber);
    }
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
      <PhoneInput
        ref={ref}
        containerStyle={{
          ...styles.inputContainer,
          borderColor: isDarkMode
            ? Colors.darkGrayMode
            : error
            ? Colors.error
            : Colors.lightGray,
        }}
        defaultCode={initialCountry}
        defaultValue={value}
        textContainerStyle={styles.inputContent}
        textInputStyle={[styles.inputText, styles.input]}
        codeTextStyle={[styles.inputText, styles.input, styles.inputCode]}
        flagButtonStyle={styles.intputFlag}
        onChangeFormattedText={onChangePhoneNumberHandler}
        autoFocus={autoFocus}
      />
      {error && <Text style={styles.hint}>{error}</Text>}
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
    width: '100%',
    flexDirection: 'row',
    borderColor: Colors.lightGray,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.lightGray,
    marginTop: 9,
    paddingRight: 9,
    overflow: 'hidden',
  },
  inputContent: {
    padding: 0,
    backgroundColor: Colors.lightGray,
    justifyContent: 'flex-start',
  },
  input: {
    height: 48,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
  },
  inputCode: {
    marginLeft: 0,
    padding: 0,
  },
  inputText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
    backgroundColor: Colors.lightGray,
  },
  intputFlag: {
    marginRight: 0,
    padding: 0,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default PhoneInputWrapper;
