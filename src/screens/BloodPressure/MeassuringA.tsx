import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// TODO import according to i18n
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { BloodPressureInput, Button, TextAreaInput } from '../../components';
import { saveBloodPressureRecord } from '../../thunks/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/MeassuringA'
>;

const BloodPressureMeassuringV1: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const DIARef = useRef<TextInput>(null);
  const PULRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  const saveRecord = () => {
    dispatch(saveBloodPressureRecord({ navigation, data: { hello: 'word' } }));
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.content}>
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {dayjs().locale('es-mx').format('dddd h:mm A')}
              </Text>
            </View>
            <View style={styles.textUnitContainer}>
              <Text style={styles.textUnit}>{translate('date')}</Text>
            </View>
          </View>
          <BloodPressureInput
            autoFocus
            variableName="SYS"
            magnitude="mmHg"
            onSubmitEditing={() => {
              DIARef.current?.focus();
            }}
          />
          <BloodPressureInput
            refInput={DIARef}
            variableName="DIA"
            magnitude="mmHg"
            onSubmitEditing={() => {
              PULRef.current?.focus();
            }}
          />
          <BloodPressureInput
            refInput={PULRef}
            variableName="PUL"
            magnitude="/MIN"
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
