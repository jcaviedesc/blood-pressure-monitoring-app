import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../styles';

type props = {
  testID: string;
  datatime: Date;
  onClose?: Function;
  onChange: Function;
  mode: 'date' | 'time';
  minimumDate?: Date;
  maximumDate?: Date;
};
const Header = ({ children }) => <View style={styles.header}>{children}</View>;

const DatePicker: React.FC<props> = ({
  testID,
  datatime,
  onClose = () => {},
  onChange,
  mode,
  minimumDate,
  maximumDate,
}) => {
  const [date, setDate] = useState(datatime);
  const display = Platform.OS === 'android' ? 'default' : 'spinner';
  const headerIos = Platform.OS === 'ios' && (
    <Header>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.textDone}>Done</Text>
      </TouchableOpacity>
    </Header>
  );
  return (
    <TouchableOpacity onPress={onClose} style={styles.container}>
      {headerIos}
      <DateTimePicker
        testID={testID}
        value={date}
        mode={mode}
        display={display}
        onChange={(e, d) => {
          if (Platform.OS === 'ios') {
            setDate(d);
            onChange(d);
          } else {
            onClose(d);
          }
        }}
        style={styles.datePicker}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: Colors.white,
  },
  container: {
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
  header: {
    alignItems: 'flex-end',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    justifyContent: 'flex-end',
    padding: 16,
    width: '100%',
  },
  textDone: {
    fontWeight: '500',
  },
});

export default DatePicker;
