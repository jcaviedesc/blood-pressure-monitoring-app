import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// TODO import according to i18n
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import { Colors, Fonts } from '../../styles';

dayjs.locale('es-mx');
type props = {
  onChangeDate?: (date: string) => void;
};

const HeaderChart: React.FC<props> = ({ onChangeDate }) => {
  const [date, setDate] = useState(dayjs().startOf('w'));
  const changeWeekDate = (weeks: number) => {
    setDate(date.add(weeks, 'week'));
    onChangeDate && onChangeDate(date.format('YYYY-MM-DD'));
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchable}
        underlayColor={Colors.button}
        onPress={() => {
          changeWeekDate(-1);
        }}>
        <Icon
          name={Platform.OS === 'android' ? 'arrow-left' : 'chevron-left'}
          size={27}
          color={Colors.headline}
        />
      </TouchableHighlight>
      <View>
        <Text style={styles.text}>{`${date.date()} ${date
          .endOf('w')
          .format('- D MMM YYYY')}`}</Text>
      </View>
      <View>
        {date.isBefore(dayjs().startOf('w')) && (
          <TouchableHighlight
            style={styles.touchable}
            underlayColor={Colors.button}
            onPress={() => {
              changeWeekDate(1);
            }}>
            <Icon
              name={Platform.OS === 'android' ? 'arrow-right' : 'chevron-right'}
              size={27}
              color={Colors.headline}
            />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 31,
    marginBottom: 11,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
  touchable: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderChart;
