import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import ActionSheetInputOption from '../../components/ActionSheet/inputOption';
import { useAppDispatch } from '../../hooks';
import { MainContainer } from '../../components/Layout';
import crashlytics from '@react-native-firebase/crashlytics';
import { Button, Text, Input, DateList } from '../../components';
import { fetchAddMedicine } from '../../thunks/medicine/medicine-thunks';
import {
  everySchema,
  specificSchema,
  intervalSchema,
  buildUsefulErrorObject,
} from './schemaValidators/medicineUp';
import { useTitleScroll } from '../../hooks/useTitleScroll';

type Props = NativeStackScreenProps<RootStackParamList, 'Medicine'>;

type actionSheetRefType = {
  setModalVisible: () => void;
  hide: () => void;
};
type actionSheetRefFrecuency = {
  setModalVisible: () => void;
  hide: () => void;
};
type actionSheetRefUnit = {
  setModalVisible: () => void;
  hide: () => void;
};
type actionSheetRefDays = {
  setModalVisible: () => void;
  hide: () => void;
};

const USE_SCHEMA = {
  'every day': everySchema,
  'specific days': specificSchema,
  'days interval': intervalSchema,
};
const USE_SCHEMA_DEFAULT = everySchema;

const MedicineFormScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const { setHeaderTitleShow, fadeAnim } = useTitleScroll(
    navigation,
    translate('medicine_info_screen.title'),
  );
  const [datosMedicine, setDatosMedicine] = useState({
    name: '',
    apparience: '',
    unit: '',
    value: '',
    days: [],
    via: '',
    frecuency: '',
    times_per_day: '',
    every: '',
    times: [1],
  });
  const actionSheetRefType = useRef<actionSheetRefType>();
  const actionSheetRefFrecuency = useRef<actionSheetRefFrecuency>();
  const actionSheetRefUnit = useRef<actionSheetRefUnit>();
  const actionSheetRefDays = useRef<actionSheetRefDays>();

  const [inputErrors, setInputErrors] = useState({});

  const dispatchAction = (field: any, value: any) => {
    setDatosMedicine({
      ...datosMedicine,
      [field]: value,
    });
  };

  console.log({ inputErrors })

  const isInvalidField = (key: string) => {
    return !!inputErrors.hasOwnProperty(key);
  };

  const getErrorLabelKey = (key: string) => {
    return inputErrors[key] ? inputErrors[key].msg : '';
  };

  const onHoursIterator = (field: any, value: any) => {
    const maxDate = Date.now();
    let newHours = Array.from({ length: value }, () =>
      Math.floor(Math.random() * (maxDate - 100000) + 100000),
    );
    let times = "times"
    setDatosMedicine({
      ...datosMedicine,
      [times]: newHours,
      [field]: value,
    });
  };

  const dispatchActionTimes = (value: any, selectedDate: any) => {
    let newDateSelect = dayjs(selectedDate).format();
    let arrayTimes = datosMedicine.times
    const index = arrayTimes.indexOf(value);

    if (index !== -1) {
      arrayTimes[index] = Date.parse(newDateSelect);
    }
    setDatosMedicine({
      ...datosMedicine,
      times: arrayTimes,
    });
  };

  const onChangeState = (typeArray: any, item: any) => {
    var newItem: any = item;
    var array = datosMedicine.days;
    array.indexOf(newItem) === -1
      ? array.push(newItem)
      : array.splice(array.indexOf(newItem), 1);

    dispatchAction(typeArray, array);
  };

  const arrayIterator = (array: any) => {
    let items = array.map(function (item: string) {
      return translate(item);
    });
    return items.toString();
  };

  async function nextValidateFields() {
    const newTimes = datosMedicine.times.map((element, index) => {
      return new Date(element).toString().slice(16, 24);
    });
    let value =
      datosMedicine.frecuency !== '' ? datosMedicine.frecuency : 'value';
    let schemaForm = USE_SCHEMA[value] || USE_SCHEMA_DEFAULT;
    const { error } = schemaForm.validate(
      {
        name: datosMedicine.name,
        apparience: datosMedicine.apparience,
        via: datosMedicine.via,
        frecuency: datosMedicine.frecuency,
        times_per_day: datosMedicine.times_per_day,
        value: datosMedicine.value,
        unit: datosMedicine.unit,
        days: datosMedicine.days,
        times: newTimes,
        every: datosMedicine.every,
      },
      { abortEarly: false },
    );
    if (error) {
      setInputErrors(buildUsefulErrorObject(error.details));
    } else {
      onNext(newTimes);
    }
  }

  const onNext = (newTimes: any) => {
    let datosTotal = {
      ...datosMedicine,
      times: newTimes,
      dose: {
        value: datosMedicine.value,
        unit: datosMedicine.unit
      },
      days: datosMedicine.days,
      every: datosMedicine.every,
    };
    dispatch(fetchAddMedicine(datosTotal))
      .unwrap()
      .then(() => {
        console.log('realizado con exito');
        Toast.show({
          type: 'success',
          text1: translate('medicine success'),
          position: 'bottom',
        });
        navigation.navigate('MedicineList');
      })
      .catch(error => {
        console.log(error)
        const errorInstance = new Error(error?.message);
        errorInstance.name = error.name;
        errorInstance.stack = error.stack;
        crashlytics().recordError(errorInstance);
        Toast.show({
          type: 'error',
          text1: err.msg, // TODO traducir
          position: 'bottom',
        });
      });
  };

  return (
    <MainContainer>
      <ScrollView
        style={styles.content}
        onScroll={({ nativeEvent }) => {
          const scrolling = nativeEvent.contentOffset.y;
          if (scrolling > 25) {
            setHeaderTitleShow(true);
          } else {
            setHeaderTitleShow(false);
          }
        }}>
        <Animated.View
          style={[
            styles.titleContainer,
            { opacity: fadeAnim },
            // { transform: [{ scaleY: fadeAnim }] },
          ]}>
          <Text style={styles.titleScreen}>
            {translate('medicine_info_screen.title')}
          </Text>
        </Animated.View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputSection}>
            <Input
              title={translate('medicine_info_screen.medicine')}
              onChangeText={text => {
                dispatchAction('name', text);
              }}
              value={datosMedicine.name}
              autoFocus
              hasError={isInvalidField('name')}
              hint={
                isInvalidField('name')
                  ? translate(getErrorLabelKey('name'))
                  : ''
              }
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
                value={
                  datosMedicine.apparience !== ''
                    ? translate(datosMedicine.apparience)
                    : ''
                }
                editable={false}
                hasError={isInvalidField('apparience')}
                hint={
                  isInvalidField('apparience')
                    ? translate(getErrorLabelKey('apparience'))
                    : ''
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextDose}>
            <Input
              title={translate('medicine_info_screen.dose')}
              onChangeText={text => {
                dispatchAction('value', text);
              }}
              keyboardType="number-pad"
              hasError={isInvalidField('value')}
              hint={
                isInvalidField('value')
                  ? translate(getErrorLabelKey('value'))
                  : ''
              }
            />
            <TouchableOpacity
              onPress={() => {
                actionSheetRefUnit.current?.setModalVisible();
              }}>
              <Input
                title="Unidad"
                value={datosMedicine.unit !== '' ? datosMedicine.unit : ''}
                editable={false}
                autoFocus
                hasError={isInvalidField('unit')}
                hint={
                  isInvalidField('unit')
                    ? translate(getErrorLabelKey('unit'))
                    : ''
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Input
              title={translate('medicine_info_screen.via')}
              onChangeText={text => {
                dispatchAction('via', text);
              }}
              hasError={isInvalidField('via')}
              hint={
                isInvalidField('via') ? translate(getErrorLabelKey('via')) : ''
              }
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <TouchableOpacity
              onPress={() => {
                actionSheetRefFrecuency.current?.setModalVisible();
              }}>
              <Input
                title={translate('medicine_info_screen.frecuency')}
                value={
                  datosMedicine.frecuency !== ''
                    ? translate(datosMedicine.frecuency)
                    : ' '
                }
                editable={false}
                hasError={isInvalidField('frecuency')}
                hint={
                  isInvalidField('frecuency')
                    ? translate(getErrorLabelKey('frecuency'))
                    : ''
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Input
              title={translate('medicine_info_screen.times_per_day')}
              onChangeText={text => {
                onHoursIterator('times_per_day', text);
              }}
              keyboardType="number-pad"
              hasError={isInvalidField('times_per_day')}
              hint={
                isInvalidField('times_per_day')
                  ? translate(getErrorLabelKey('times_per_day'))
                  : ''
              }
            />
          </View>
        </View>
        {datosMedicine.frecuency !== '' &&
          datosMedicine.frecuency === 'specific days' && (
            <View style={styles.toggleContainer}>
              <View style={styles.inputTextContainer}>
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRefDays.current?.setModalVisible();
                  }}>
                  <Input
                    title={translate('days medicine')}
                    value={
                      datosMedicine.days.length !== 0
                        ? arrayIterator(datosMedicine.days)
                        : ''
                    }
                    editable={false}
                    hasError={isInvalidField('days')}
                    hint={
                      isInvalidField('days')
                        ? translate(getErrorLabelKey('days'))
                        : ''
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        {datosMedicine.frecuency !== '' &&
          datosMedicine.frecuency === 'days interval' && (
            <View style={styles.toggleContainer}>
              <View style={styles.inputTextContainer}>
                <Input
                  title={translate('medicine_info_screen.days_interval')}
                  onChangeText={text => {
                    dispatchAction('every', text);
                  }}
                  keyboardType="number-pad"
                  hasError={isInvalidField('every')}
                  hint={
                    isInvalidField('every')
                      ? translate(getErrorLabelKey('every'))
                      : ''
                  }
                />
              </View>
            </View>
          )}
        <Text style={styles.inputTitle}>
          {translate('medicine_info_screen.times_hours')}
        </Text>
        {datosMedicine.times.map((item, index) => {
          return (
            <View style={styles.toggleContainer}>
              <View style={styles.inputTextContainer}>
                <DateList
                  onChangeDate={dispatchActionTimes}
                  key={index}
                  value={item}
                  editable={false}
                />
              </View>
            </View>
          );
        })}

        <ActionSheetInputOption
          actionSheetRef={actionSheetRefType}
          titleAction="medicine_info_screen.type"
          selected={datosMedicine.apparience}
          withIcon={true}
          type="only"
          options={[
            {
              label: translate('medicine_info_screen.pill'),
              value: 'pill',
              icon: 'pills',
            },
            {
              label: translate('medicine_info_screen.solution'),
              value: 'solution',
              icon: 'prescription-bottle-alt',
            },
            {
              label: translate('medicine_info_screen.injection'),
              value: 'injection',
              icon: 'syringe',
            },
            {
              label: translate('medicine_info_screen.dust'),
              value: 'dust',
              icon: 'prescription-bottle',
            },
            {
              label: translate('medicine_info_screen.drops'),
              value: 'drops',
              icon: 'eye-dropper',
            },
            {
              label: translate('medicine_info_screen.inhaler'),
              value: 'inhaler',
              icon: 'lungs',
            },
            {
              label: translate('medicine_info_screen.other'),
              value: 'other',
              icon: 'question-circle',
            },
          ]}
          onPress={({ value }) => {
            dispatchAction('apparience', value);
          }}
        />
        <ActionSheetInputOption
          actionSheetRef={actionSheetRefFrecuency}
          titleAction="medicine_info_screen.frecuency"
          selected={datosMedicine.days}
          type="only"
          options={[
            {
              label: translate('every day'),
              value: 'every day',
              icon: 'clock',
            },
            {
              label: translate('specific days'),
              value: 'specific days',
              icon: 'clock',
            },
            {
              label: translate('days interval'),
              value: 'days interval',
              icon: 'clock',
            },
          ]}
          onPress={({ value }) => {
            dispatchAction('frecuency', value);
          }}
        />
        <ActionSheetInputOption
          actionSheetRef={actionSheetRefUnit}
          titleAction="medicine_info_screen.dose"
          selected={datosMedicine.unit}
          type="only"
          options={[
            { label: 'g', value: 'g', icon: 'balance-scale' },
            { label: 'IU', value: 'IU', icon: 'balance-scale' },
            { label: 'mcg', value: 'mcg', icon: 'balance-scale' },
            { label: 'mcg/hr', value: 'mcg/hr', icon: 'balance-scale' },
            { label: 'mcg/ml', value: 'mcg/ml', icon: 'balance-scale' },
            { label: 'mEq', value: 'mEq', icon: 'balance-scale' },
            { label: 'mg', value: 'mg', icon: 'balance-scale' },
            { label: 'mg/cm2', value: 'mg/cm2', icon: 'balance-scale' },
            { label: 'mg/g', value: 'mg/g', icon: 'balance-scale' },
            { label: 'mg/ml', value: 'mg/ml', icon: 'balance-scale' },
            { label: 'mL', value: 'mL', icon: 'balance-scale' },
            { label: '%', value: '%', icon: 'balance-scale' },
          ]}
          onPress={({ value }) => {
            dispatchAction('unit', value);
          }}
        />
        <ActionSheetInputOption
          actionSheetRef={actionSheetRefDays}
          titleAction="medicine_info_screen.dose"
          selected={datosMedicine.days}
          type="multiple"
          options={[
            { label: translate('days.monday'), value: 'mon', icon: 'clock' },
            { label: translate('days.tuesday'), value: 'tue', icon: 'clock' },
            { label: translate('days.wednesday'), value: 'wed', icon: 'clock' },
            { label: translate('days.thursday'), value: 'thu', icon: 'clock' },
            { label: translate('days.friday'), value: 'fri', icon: 'clock' },
            { label: translate('days.saturday'), value: 'sat', icon: 'clock' },
            { label: translate('days.sunday'), value: 'sun', icon: 'clock' },
          ]}
          onPress={({ value }) => {
            onChangeState('days', value);
          }}
        />
        <View style={styles.footer}>
          <Button
            title={translate('medicine_info_screen.keep_medicine')}
            onPress={nextValidateFields}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
  title: {
    ...Fonts.style.h5,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginHorizontal: Metrics.marginHorizontal,
  },
  inputTitle: {
    color: Colors.headline,
    marginLeft: 3,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
  },
  toggleContainer: {
    justifyContent: 'flex-end',
    marginBottom: 10,
    minHeight: 50,
  },
  inputSection: {
    marginTop: 2,
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
  inputTextDose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: Colors.tertiary,
    borderWidth: 1,
    height: 100,
    paddingHorizontal: 2,
  },
  touchableHighlightSelected: {
    backgroundColor: Colors.tertiary,
    borderWidth: 0,
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});
export default MedicineFormScreen;
