import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker, {
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import { Colors, Fonts } from '../../styles';

type Props = {
  testID: string;
  value: Date;
  onChange: Function;
  mode: 'date' | 'time';
  is24Hour: boolean;
  display: AndroidNativeProps['display'];
  minimumDate?: Date;
  maximumDate?: Date;
};
const Header = ({ children }) => <View style={styles.header}>{children}</View>;

const DatePicker: React.FC<Props> = ({
  testID,
  value,
  onChange,
  mode,
  is24Hour,
  display = 'default',
  minimumDate,
  maximumDate,
}) => {
  const [dateValue, setDateValue] = useState(value);

  const closeHandler = () => {
    onChange(dateValue);
  };

  const headerIos = Platform.OS === 'ios' && (
    <Header>
      <TouchableOpacity onPress={closeHandler}>
        <Text style={styles.textDone}>Done</Text>
      </TouchableOpacity>
    </Header>
  );
  return (
    <TouchableOpacity onPress={closeHandler} style={styles.container}>
      {headerIos}
      <DateTimePicker
        testID={testID}
        value={dateValue}
        mode={mode}
        is24Hour={is24Hour}
        display={display}
        onChange={(e, d) => {
          if (Platform.OS === 'ios') {
            setDateValue(d ?? dateValue);
          } else {
            onChange(d ?? dateValue);
          }
        }}
        style={styles.datePicker}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        minuteInterval={5}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: Colors.background,
  },
  container: {
    backgroundColor: Colors.transparent,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  header: {
    alignItems: 'flex-end',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    width: '100%',
    shadowColor: '#211446',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.84,
    elevation: 5,
  },
  textDone: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
  },
});

export default DatePicker;
