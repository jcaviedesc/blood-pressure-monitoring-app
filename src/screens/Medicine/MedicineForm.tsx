import React, { useRef, useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  
} from 'react-native';
import dayjsUtil from '../../services/DatatimeUtil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import ActionSheet from 'react-native-actions-sheet';
import { HealtInfoAction } from '../../store/signup/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { DatePicker, Button, Text, Input, InputOption } from '../../components';
import { useMedicineForm } from '../../hooks/medicine/useMedicine';
import { selectUser, updateHealtQuestions, updateUserField } from '../../store/signup/signupSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;

type actionSheetRefType = {
  setModalVisible: () => void;
  hide: () => void;
};
type actionSheetRefFrecuency = {
  setModalVisible: () => void;
  hide: () => void;
};

const MedicineFormScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { name, healtQuestions, startdate, enddate } =
    useAppSelector(selectUser);
  const actionSheetRefType = useRef<actionSheetRefType>();
  const actionSheetRefFrecuency = useRef<actionSheetRefFrecuency>();
  const [date, setDate] = useState(new Date(327207177000));
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const limitDate = useMemo(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const maxDate = new Date(year, 11, 31, 9, 1, 1, 1);
    return maxDate;
  }, []);

  const { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord } =
    useMedicineForm(); 

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

  const showDatepicker = option => {
    option === 'start' ? setShowStart(true) : setShowEnd(true);
  };

  const onChangeStart = (selectedDate: Date): void => {
    setShowStart(false);
    setDate(selectedDate);
    dispatchAction('startdate', dayjsUtil(selectedDate).format('YYYY-MM-DD'));
  };

  const onChangeEnd = (selectedDate: Date): void => {
    setShowEnd(false);
    setDate(selectedDate);
    dispatchAction('enddate', dayjsUtil(selectedDate).format('YYYY-MM-DD'));
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
            <TouchableOpacity
              onPress={() => {
                actionSheetRefType.current?.setModalVisible();
              }}>
              <Input
                title={translate('medicine_info_screen.type')}
                value={name}
                editable={false}
                autoFocus
              />

            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                actionSheetRefType.current?.setModalVisible();
              }}>
              <Input
                title={translate('medicine_info_screen.frecuency')}
                value={name}
                editable={false}
                autoFocus
              />

            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.period')}
            </Text>
          </View>
          <View></View>
          {showStart && (
            <DatePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChangeStart}
              maximumDate={limitDate}
            />
          )}
          {showEnd && (
            <DatePicker
              testID="dateTimePicker"
              value={startdate}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChangeEnd}
              maximumDate={limitDate}
            />
          )}
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.dateStart')}
            </Text>
            <TouchableHighlight
              underlayColor={Colors.background}
              style={[styles.touchableBirthdate]}
              onPress={() => showDatepicker('start')}>
              <Text style={styles.touchableText}>
                {startdate
                  ? dayjsUtil(date).format('DD - MMMM -  YYYY')
                  : '_ _ - _ _ - _ _'}
              </Text>
            </TouchableHighlight>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.dateEnd')}
            </Text>
            <TouchableHighlight
              underlayColor={Colors.background}
              style={[styles.touchableBirthdate]}
              onPress={() => showDatepicker('end')}>
              <Text style={styles.touchableText}>
                {enddate
                  ? dayjsUtil(date).format('DD - MMMM -  YYYY')
                  : '_ _ - _ _ - _ _'}
              </Text>
            </TouchableHighlight>
          </View>
          <View></View>
          {showStart && (
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChangeStart}
              maximumDate={limitDate}
            />
          )}
          {showEnd && (
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange={onChangeEnd}
              maximumDate={limitDate}
            />
          )}
        </View>
        <ActionSheet ref={actionSheetRefType} bounceOnOpen>
          <View style={styles.actionSheet}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.type')}
            </Text>
            <InputOption
              selected={healtQuestions.smoke}
              options={[
                { label: translate('medicine_info_screen.pill'), value: 'pill', icon: 'pills' },
                { label: translate('medicine_info_screen.solution'), value: 'solution', icon: 'prescription-bottle-alt' },
                { label: translate('medicine_info_screen.injection'), value: 'injection', icon: 'syringe' },
                { label: translate('medicine_info_screen.dust'), value: 'dust', icon: 'prescription-bottle' },
                { label: translate('medicine_info_screen.drops'), value: 'drops', icon: 'eye-dropper' },
                { label: translate('medicine_info_screen.inhaler'), value: 'inhaler', icon: 'lungs' },
                { label: translate('medicine_info_screen.other'), value: 'other', icon: 'question-circle' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption('smoke', value as HealtInfoAction['value']);
              }}
            />
          </View>
        </ActionSheet>
        <ActionSheet ref={actionSheetRefFrecuency} bounceOnOpen>
          <View style={styles.actionSheet}>
            <Text style={styles.inputText}>
              {translate('medicine_info_screen.frecuency')}
            </Text>
            <InputOption
              selected={healtQuestions.smoke}
              options={[
                { label: 'Diario', value: 'yes', icon: 'clock' },
                { label: 'Cada 8 horas', value: 'not', icon: 'clock' },
                { label: 'Cada 10 horas', value: 'ok', icon: 'clock' },
                { label: 'Cada 12 horas', value: 'nok', icon: 'clock' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption('smoke', value as HealtInfoAction['value']);
              }}
            />
          </View>
        </ActionSheet>
        <View style={styles.footer}>
          <Button
            title={translate('medicine_info_screen.keep_medicine')}
            onPress={onNext}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
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
  touchableHighlight: {
    //alignItems: 'center',
    borderColor: Colors.tertiary,
    borderWidth: 1,
    //justifyContent: 'center',
    height: 100,
    paddingHorizontal: 2,
  },
  touchableHighlightSelected: {
    backgroundColor: Colors.tertiary,
    borderWidth: 0,
  },
});
export default MedicineFormScreen;
