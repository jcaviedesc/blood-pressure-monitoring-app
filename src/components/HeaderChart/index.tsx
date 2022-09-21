import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import dayjs from '../../services/DatatimeUtil';
import { Colors, Fonts } from '../../styles';

type props = {
  onChangeDate?: (startDate: string, endDate: string) => void;
};

const HeaderChart: React.FC<props> = ({ onChangeDate }) => {
  const { locale } = useI18nLocate();
  const [date, setDate] = useState(dayjs().locale(locale).startOf('w'));

  const changeWeekDate = (weeks: number) => {
    const newDate = date.add(weeks, 'week');
    setDate(newDate);
    onChangeDate &&
      onChangeDate(
        newDate.format('YYYY-MM-DD'),
        newDate.endOf('w').format('YYYY-MM-DD'),
      );
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchable}
        underlayColor={Colors.buttonTranslucent}
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
          .format('- D MMMM YYYY')}`}</Text>
      </View>
      <View style={styles.touchableRightContainer}>
        {date.isBefore(dayjs().startOf('w')) && (
          <TouchableHighlight
            style={[styles.touchable, styles.tochableRight]}
            underlayColor={Colors.buttonTranslucent}
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
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
  touchable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tochableRight: {
    alignItems: 'flex-end',
  },
  touchableRightContainer: {
    width: 40,
    height: 40,
  },
});

export default HeaderChart;
