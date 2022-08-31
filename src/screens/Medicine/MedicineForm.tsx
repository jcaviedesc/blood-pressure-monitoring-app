import React, { useLayoutEffect, useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { findMonitors } from '../../thunks/blood-pressure/monitors-thunk';
import { selectMonitors } from '../../store/blood-pressure';
import {
  selectUser,
  updateHealtQuestions,
  updateUserField,
} from '../../store/medicineup/medicineupSlice';
import { HealtInfoAction } from '../../store/signup/types';
import { useMeasuringForm } from '../../hooks/blood-pressure/useMeasuring';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { DatePicker, InputToggle, Button, Text, Input, InputOption } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;

const MedicineFormScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { name, lastName, docId, healtQuestions } = useAppSelector(selectUser);
  const [inputErrors, setInputErrors] = useState({});
  const { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord } =
    useMeasuringForm();
  const monitors = useAppSelector(selectMonitors);
  const [date, setDate] = useState(new Date(327207177000));
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const limitDate = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const maxDate = new Date(year, 11, 31, 9, 1, 1, 1);
    return maxDate;
  }, []);

  const dispatchAction = (userField: string, value: string) => {
    // name.trimStart().trimEnd()
    dispatch(updateUserField({ field: userField, value: value }));
  };

  const onSelectHealtOption = (
    key: HealtInfoAction['field'],
    value: HealtInfoAction['value'],
  ) => {
    dispatch(updateHealtQuestions({ field: key, value }));
  };

  const onNext = () => {
    console.log('keep data');
  };

  const showDatepicker = () => {
    setShowEnd(true);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.title}>
            {translate('medicine_info_screen.title')}
          </Text>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputSection}>
            <Input
              title={translate('medicine_info_screen.medicine')}
              value={name}
              onChangeText={text => {
                dispatchAction('name', text);
              }}
              autoFocus
              //hasError={inputErrors?.name}
              //hint={inputErrors?.name}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.type')}
            </Text>
            <InputOption
              selected={healtQuestions.smoke}
              options={[
                { label: 'Pildora', value: 'yes' },
                { label: 'MI', value: 'not' },
                { label: 'Gotas', value: 'ok' },
                { label: 'Inhaladores', value: 'nok' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption('smoke', value as HealtInfoAction['value']);
              }}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputSection}>
            <Input
              title={translate('medicine_info_screen.dose')}
              value={name}
              onChangeText={text => {
                dispatchAction('name', text);
              }}
              autoFocus
              //hasError={inputErrors?.name}
              //hint={inputErrors?.name}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.concurrence')}
            </Text>
          </View>
          <InputOption
              selected={healtQuestions.smoke}
              options={[
                { label: 'Diario', value: 'yes' },
                { label: 'Cada 8 horas', value: 'not' },
                { label: 'Cada 10 horas', value: 'ok' },
                { label: 'Cada 12 horas', value: 'nok' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption('smoke', value as HealtInfoAction['value']);
              }}
            />
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.period')}
            </Text>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.dateStart')}
            </Text>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.dateEnd')}
            </Text>
          </View>
          <View>
            <TouchableHighlight
              underlayColor={Colors.background}
              style={[styles.touchableBirthdate]}
              onPress={showDatepicker}>
              <Text style={styles.touchableText}>
                {/* {birthdate
                  ? dayjsUtil(date).format('DD - MMMM -  YYYY')
                  : '_ _ - _ _ - _ _'} */}
              </Text>
            </TouchableHighlight>
          </View>
          {/* showStart && (
          <DatePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            maximumDate={limitDate}
          />
        ) */}
          {/* showEnd && (
          <DatePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            maximumDate={limitDate}
          />
        ) */}
        </View>
        <View style={styles.footer}>
          <Button title={translate('button.next')} onPress={onNext} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginHorizontal: Metrics.marginHorizontal,
  },
  toggleContainer: {
    justifyContent: 'flex-end',
    marginBottom: 31,
    minHeight: 50,
  },
  inputSection: {
    marginTop: 12,
  },
  inputText: {
    color: Colors.headline,
    marginLeft: 3,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
  },
  inputTextContainer: {
    marginBottom: 9,
    marginRight: 6,
  },
  inputToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  containerInput: {
    width: '45%',
  },
  footer: {
    marginTop: 18,
    marginBottom: 12,
  },
  touchableBirthdate: {
    marginTop: 9,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  touchableText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
});
export default MedicineFormScreen;
