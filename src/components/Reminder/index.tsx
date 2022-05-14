import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';

dayjs.extend(utc);

type props = {
  title: string;
  description: string;
  state: 'active' | 'inactive';
  onSelected: (id: string) => void;
  reminders: string[];
  id: string;
  frecuency?: 'everyday' | undefined;
  onSelectReminderTime: (reminderId: string, index: number) => void;
  disabled: boolean;
};

const Reminder: React.FC<props> = ({
  title,
  description,
  state,
  onSelected,
  reminders,
  id,
  frecuency,
  onSelectReminderTime,
  disabled,
}) => {
  const { translate } = useI18nLocate();

  const convertTime = (time: string) => {
    if (dayjs(time).isValid()) {
      return dayjs(time).format('	h:mm a');
    }
    return '00:00';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      disabled={disabled}
      onPress={() => {
        onSelected(id);
      }}>
      <View
        style={{
          ...styles.reminderContainer,
          backgroundColor:
            state === 'active'
              ? Colors.buttonTranslucent
              : Colors.secondaryTranslucent,
        }}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.description}>{description}</Text>
        </View>
        {state === 'active' && (
          <View style={styles.reminderBody}>
            {frecuency !== 'everyday' && (
              <View style={styles.row}>
                <View>
                  <Text style={styles.title}>{translate('repeat')}</Text>
                </View>
                <View>
                  <Text>{translate('repeat')}</Text>
                </View>
              </View>
            )}
            {reminders.map((time, num) => {
              return (
                <View style={styles.row} key={`${id}-${num}`}>
                  <View>
                    <Text style={styles.title}>
                      {translate('reminder_to', { time: num + 1 })}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      onSelectReminderTime && onSelectReminderTime(id, num);
                    }}>
                    <View style={styles.rowTimeContainer}>
                      <Text style={styles.time}>{convertTime(time)}</Text>
                      <IconEntypo name="chevron-small-right" size={18} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    borderRadius: 6,
    marginBottom: 15,
    paddingVertical: 9,
    paddingLeft: 21,
    paddingRight: 15,
  },
  title: {
    ...Fonts.style.h6,
    color: Colors.headline,
  },
  description: {
    ...Fonts.style.paragraph,
    color: Colors.paragraph,
  },
  reminderBody: {
    paddingTop: 9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  rowTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    ...Fonts.style.paragraph,
    color: Colors.paragraph,
  },
});

export default Reminder;
