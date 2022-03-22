import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// TODO import according to i18n
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { BloodPressureInput, Button, TextAreaInput } from '../../components';
import { saveBloodPressureRecord } from '../../thunks/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateCurrentRecord, addRecord } from '../../store/blood-pressure';
import type { BloodPressureRecord } from '../../store/blood-pressure/types';
import { useFocusEffect } from '@react-navigation/native';

dayjs.extend(utc);

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeassuringA'
>;

const BloodPressureMeassuringV1: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { translate } = useI18nLocate();
  const SYSRef = useRef<TextInput>(null);
  const DIARef = useRef<TextInput>(null);
  const PULRef = useRef<TextInput>(null);

  const [datatime, setDatatime] = useState(dayjs());

  const updateInput = useCallback(
    (field: keyof BloodPressureRecord, val: number | string) => {
      dispatch(updateCurrentRecord({ field, value: val }));
    },
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      const currentTime = dayjs();
      if (currentTime.diff(datatime, 'm') > 2) {
        updateInput('datetime', currentTime.utc().format());
        setDatatime(currentTime);
      } else {
        updateInput('datetime', datatime.utc().format());
      }
    }, [updateInput, datatime]),
  );

  const saveRecord = () => {
    DIARef.current?.clear();
    PULRef.current?.clear();
    SYSRef.current?.clear();
    dispatch(addRecord());
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.content}>
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {datatime.locale('es-mx').format('dddd h:mm A')}
              </Text>
            </View>
            <View style={styles.textUnitContainer}>
              <Text style={styles.textUnit}>{translate('date')}</Text>
            </View>
          </View>
          <BloodPressureInput
            refInput={SYSRef}
            autoFocus
            variableName="SYS"
            magnitude="mmHg"
            onSubmitEditing={({ nativeEvent: { text } }) => {
              updateInput('sys', text);
              DIARef.current?.focus();
            }}
          />
          <BloodPressureInput
            refInput={DIARef}
            variableName="DIA"
            magnitude="mmHg"
            onSubmitEditing={({ nativeEvent: { text } }) => {
              updateInput('dia', text);
              PULRef.current?.focus();
            }}
          />
          <BloodPressureInput
            refInput={PULRef}
            variableName="PUL"
            magnitude="/MIN"
            onChangeText={text => {
              updateInput('bpm', text);
            }}
          />
          <View style={styles.textAreaContainer}>
            <TextAreaInput title="Observaciones" />
          </View>
        </View>
      </ScrollView>
      <View style={styles.section}>
        <Button title={translate('button.save')} onPress={saveRecord} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    paddingTop: 21,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 42,
  },
  textUnit: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
  },
  textUnitContainer: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 21,
  },
  timeContainer: {
    height: '100%',
    width: '55%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12,
    backgroundColor: Colors.lightGray,
  },
  timeText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
  textAreaContainer: {
    paddingBottom: 21,
  },
});

export default BloodPressureMeassuringV1;
