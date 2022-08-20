import React, { useRef } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';
import { Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type PhoneInputWrapperProps = {
  title?: string;
  initialCountry: PhoneInputProps['defaultCode'];
  value: string;
  onPhoneInputChange: (number: string) => void;
  autoFocus?: boolean;
  error?: string | undefined;
};

type PhoneInputRef = {
  isValidNumber: (number: string) => boolean;
  getCallingCode: () => string;
};

const PhoneInputWrapper: React.FC<PhoneInputWrapperProps> = ({
  title,
  initialCountry,
  value,
  onPhoneInputChange,
  autoFocus,
  error,
}) => {
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  const ref = useRef<PhoneInputRef>();
  const backgroundColor = isDarkMode ? Colors.darkGrayMode : Colors.lightGray;

  const onChangePhoneNumberHandler = (phoneNumber: string) => {
    if (ref.current?.isValidNumber(phoneNumber)) {
      onPhoneInputChange(phoneNumber);
    }
  };
  const phoneContainerStyles = {
    ...styles.inputContainer,
    backgroundColor,
    borderColor: isDarkMode ? Colors.darkGrayMode : Colors.lightGray,
  };

  if (error) {
    phoneContainerStyles.borderColor = Colors.error;
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
      <PhoneInput
        ref={ref}
        containerStyle={phoneContainerStyles}
        layout="first"
        defaultCode={initialCountry}
        defaultValue={value}
        textContainerStyle={{ ...styles.inputContent, backgroundColor }}
        textInputStyle={[styles.inputText, styles.input, { backgroundColor }]}
        codeTextStyle={[
          styles.inputText,
          styles.input,
          styles.inputCode,
          { backgroundColor },
        ]}
        placeholder={translate('phone number')}
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
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 9,
    paddingRight: 9,
    overflow: 'hidden',
  },
  inputContent: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  input: {
    height: 48,
  },
  inputCode: {
    paddingVertical: 10,
  },
  inputText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
    backgroundColor: Colors.lightGray,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default PhoneInputWrapper;
