import React, { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppStyles } from '../../styles';
import { Reminder, DatePicker, Text } from '../../components';
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
import { MainScrollView } from '../../components/Layout';

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

  const onPressFrequencyHandler = () => {
    actionSheetRef.current?.setModalVisible();
  };

  return (
    <View style={styles.fullScreen}>
      <MainScrollView>
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
          frequencyDays={reminders[reminderActive].repeat}
          onPressFrequency={onPressFrequencyHandler}
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
          frequencyDays={reminders[reminderActive].repeat}
          onPressFrequency={onPressFrequencyHandler}
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
          frequencyDays={reminders[reminderActive].repeat}
          onPressFrequency={onPressFrequencyHandler}
          frequency="everyday"
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
        <Reminder
          title={translate('BloodPressure/Reminders.custom')}
          description={translate('BloodPressure/Reminders.custom_description')}
          state={getRemiderActive(reminderActive, 'custom')}
          onSelected={setReminderActive}
          reminders={custom.times}
          id="custom"
          frequencyDays={reminders[reminderActive].repeat}
          disabled={reminderActive === 'custom'}
          onPressFrequency={onPressFrequencyHandler}
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
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
      </MainScrollView>
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
    </View>
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
