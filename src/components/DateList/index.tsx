import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useColorScheme,
  Platform,
  TouchableOpacity
} from 'react-native';
import DatePicker from "../DataTimePickerWrapper"
import { Colors, Fonts } from '../../styles';
import { Text } from '../CustomText';
import dayjs from 'dayjs';

export type InputProps = {
  textInputRef?: React.LegacyRef<TextInput>;
  title?: string;
  key: any;
  onFocus?: Function;
  editable?: boolean;
  value?: string;
  showSoftInputOnFocus?: boolean;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeDate?: any;
  hint?: string;
  rigthComponent?: Element;
  autoFocus?: boolean;
  hasError?: boolean;
  leftComponent?: Element;
  hierarchy?: 'loud' | 'quiet' | 'transparent';
};

const DateList: React.FC<InputProps> = ({
  textInputRef,
  title,
  onFocus,
  editable,
  value,
  showSoftInputOnFocus,
  placeholder,
  keyboardType,
  onChangeDate,
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

  const [showReminderTime, setShowReminderTime] = useState(false);

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

  const onChangeReminderTime = (selectedDate: Date): void => {
    onChangeDate(value, selectedDate);
    setShowReminderTime(false);
  };

  return (
    <View style={styles.mainInputContainer}>
      <TouchableOpacity
        onPress={() => {
          setShowReminderTime(true);
        }}>
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
            //value={dayjs(value).format().toString().slice(11,16)}
            value={new Date(value).toString().slice(15, 21)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            //onChangeText={onChangeText}
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
      </TouchableOpacity>
      {showReminderTime && (
        <DatePicker
          testID="dateTimePicker"
          value={new Date(value)}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'android' ? 'clock' : 'spinner'}
          onChange={onChangeReminderTime}
          minuteInterval={1}
        />
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

export default DateList;
