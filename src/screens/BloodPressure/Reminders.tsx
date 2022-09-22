import React, { useEffect, useState, useRef } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppStyles } from '../../styles';
import { Reminder, DatePicker } from '../../components';
import ActionSheetWeekDays, {
  OptionMode,
  SelectModes,
} from '../../components/ActionSheet/weekdays';
import {
  setReminderTime,
  setReminderStage,
  selectActiveReminderTime,
  selectReminders,
  setRepeatReminder,
} from '../../store/blood-pressure';
import DateInstance from '../../services/DateService';

dayjs.extend(utc);
type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Reminders'
>;

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

const BloodPressureReminders: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { reminders, selectedReminder: reminderActive } =
    useAppSelector(selectReminders);
  const dispatch = useAppDispatch();
  const { normal, hta1, hta2, custom } = reminders;

  const [showReminderTime, setShowReminderTime] = useState(false);
  const actionSheetRef = useRef<actionSheetRef>();
  const reminderRef = useRef<string>('');

  useEffect(() => {
    navigation.setOptions({
      title: translate('BloodPressure/Reminders.title'),
    });
  }, [navigation, translate]);

  const getRemiderActive = (state: string, type: string) =>
    type === state ? 'active' : 'inactive';

  const setReminderActive = (name: any) => {
    try {
      dispatch(setReminderStage(name));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeReminderTime = (selectedDate: Date): void => {
    dispatch(
      setReminderTime({
        stage: reminderRef.current,
        value: dayjs(selectedDate).format(),
      }),
    );
    setShowReminderTime(false);
  };

  const onSelectReminderTimeHandler = (reminderId: string, index: number) => {
    reminderRef.current = `${reminderId}.${index}`;
    setShowReminderTime(true);
  };

  const onSetRepeatReminder = (weekday: string[]) => {
    dispatch(setRepeatReminder({ reminder: reminderActive, repeat: weekday }));
  };

  const onPressFrecuencyHandler = () => {
    actionSheetRef.current?.setModalVisible();
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.paragraph}>
            {translate('BloodPressure/Reminders.subtitle')}
          </Text>
        </View>
        <Reminder
          title={translate('BloodPressure/Reminders.normal')}
          description={translate('BloodPressure/Reminders.normal_description')}
          state={getRemiderActive(reminderActive, 'normal')}
          onSelected={setReminderActive}
          reminders={normal.times}
          id="normal"
          frecuencyDays={reminders[reminderActive].repeat}
          onPressFrecuency={onPressFrecuencyHandler}
          disabled={reminderActive === 'normal'}
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
        <Reminder
          title={translate('BloodPressure/Reminders.hypertension_1')}
          description={translate(
            'BloodPressure/Reminders.hypertension_1_description',
          )}
          state={getRemiderActive(reminderActive, 'hta1')}
          onSelected={setReminderActive}
          reminders={hta1.times}
          id="hta1"
          frecuencyDays={reminders[reminderActive].repeat}
          onPressFrecuency={onPressFrecuencyHandler}
          disabled={reminderActive === 'hta1'}
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
        <Reminder
          title={translate('BloodPressure/Reminders.hypertension_2')}
          description={translate(
            'BloodPressure/Reminders.hypertension_2_description',
          )}
          state={getRemiderActive(reminderActive, 'hta2')}
          onSelected={setReminderActive}
          reminders={hta2.times}
          id="hta2"
          disabled={reminderActive === 'hta2'}
          frecuencyDays={reminders[reminderActive].repeat}
          onPressFrecuency={onPressFrecuencyHandler}
          frecuency="everyday"
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
        <Reminder
          title={translate('BloodPressure/Reminders.custom')}
          description={translate('BloodPressure/Reminders.custom_description')}
          state={getRemiderActive(reminderActive, 'custom')}
          onSelected={setReminderActive}
          reminders={custom.times}
          id="custom"
          frecuencyDays={reminders[reminderActive].repeat}
          disabled={reminderActive === 'custom'}
          onPressFrecuency={onPressFrecuencyHandler}
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
      </View>
      {showReminderTime && (
        <DatePicker
          testID="dateTimePicker"
          value={DateInstance(
            selectActiveReminderTime(reminders, reminderRef.current),
          )}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'android' ? 'clock' : 'spinner'}
          onChange={onChangeReminderTime}
          minuteInterval={1}
        />
      )}
      <ActionSheetWeekDays
        actionSheetRef={actionSheetRef}
        onPressOption={(id, opionSelected) => {
          onSetRepeatReminder(opionSelected);
        }}
        selected={reminders[reminderActive].repeat}
        componentId={reminderActive}
        optionMode={
          reminderActive === 'hta1' ? OptionMode.GROUPED : OptionMode.INDIVIDUAL
        }
        selectMode={
          reminderActive === 'custom' ? SelectModes.MULTIPLE : SelectModes.UNICA
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
  actionSheetTouch: {
    ...AppStyles.withActionsheet.actionSheetTouch,
    paddingVertical: 12,
  },
  subtitleContainer: {
    marginBottom: 9,
  },
  actionSheetButtons: {
    marginTop: 12,
    flexDirection: 'row',
  },
  actionSheetButton: {
    flex: 2,
    marginHorizontal: 21,
  },
});

export default BloodPressureReminders;
