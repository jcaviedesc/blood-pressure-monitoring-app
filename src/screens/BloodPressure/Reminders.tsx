import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActionSheet from 'react-native-actions-sheet';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppStyles, Colors } from '../../styles';
import { Reminder, DatePicker } from '../../components';
import { selectReminders } from '../../store/blood-pressure/selectors';
import { setReminderTime, setReminderStage } from '../../store/blood-pressure';

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
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_small_icon',
        color: Colors.tertiary,
      },
    });
  }

  const { translate } = useI18nLocate();
  const {
    normal,
    hta1,
    hta2,
    custom,
    selectedReminder: reminderActive,
  } = useAppSelector(selectReminders);
  const dispatch = useAppDispatch();

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
    dispatch(setReminderStage(name));
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

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <Button title="Display Notification" onPress={() => onDisplayNotification()} />
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
          onSelectReminderTime={onSelectReminderTimeHandler}
        />
      </View>
      {showReminderTime && (
        <DatePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'android' ? 'clock' : 'spinner'}
          onChange={onChangeReminderTime}
        />
      )}
      {/* <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={styles.actionSheet}>
          <TouchableOpacity
            style={styles.actionSheetTouch}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <View style={styles.actionSheetTouchContent}>
              <Text style={styles.actionSheetText}>
                {translate('Home/BloodPressure.action_sheet.take_bp')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
  subtitleContainer: {
    marginBottom: 9,
  },
});

export default BloodPressureReminders;
