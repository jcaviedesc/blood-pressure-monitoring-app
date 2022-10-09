import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { Input, Card, Text, Button, TextAreaInput } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { MainContainer } from '../../components/Layout';
// import { useAppDispatch } from '../../hooks';
import { useMeasuringForm } from '../../hooks/blood-pressure/useMeasuring';
import { useTitleScroll } from '../../hooks/useTitleScroll';
import { useBloodPressureMeasurement } from '../../hooks/realm/useBloodPressure';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Measuring'
>;

const BloodPressureMeasuring: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { saveMeasurement } = useBloodPressureMeasurement();
  // const dispatch = useAppDispatch();
  const { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord } =
    useMeasuringForm();
  const { setHeaderTitleShow, fadeAnim } = useTitleScroll(
    navigation,
    translate('BloodPressure/Measuring.header_title'),
  );
  const [diaRef, bpmRef] = [useRef<TextInput>(), useRef<TextInput>()];

  const onSubmit = () => {
    const record = selectRecord();
    console.log(record);
    // TODO cambiar typo
    saveMeasurement(record);
    navigation.navigate('BloodPressure');
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
            {translate('BloodPressure/Measuring.title')}
          </Text>
        </Animated.View>
        <Card>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Measuring.date')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                editable={false}
                hierarchy="transparent"
                textAlign="right"
                value={state.datetime.format('DD MMMM YYYY')}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Measuring.time')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                editable={false}
                hierarchy="transparent"
                textAlign="right"
                value={state.datetime.format('hh:mm A')}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Measuring.sys')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                maxLength={3}
                autoFocus
                onChangeText={text => {
                  onChange('sys', text);
                }}
                onSubmitEditing={() => {
                  diaRef.current?.focus();
                }}
                rightComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>
                    mmHg
                  </Text>
                }
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Measuring.dia')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                textInputRef={diaRef}
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                maxLength={3}
                onChangeText={text => {
                  onChange('dia', text);
                }}
                onSubmitEditing={() => {
                  bpmRef.current?.focus();
                }}
                rightComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>
                    mmHg
                  </Text>
                }
              />
            </View>
          </View>
          <View style={[styles.rowContainer, styles.lastRowContainer]}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Measuring.heart_rate')}
              </Text>
            </View>
            <View style={styles.containerInput}>
              <Input
                textInputRef={bpmRef}
                hierarchy="transparent"
                keyboardType="numeric"
                textAlign="right"
                maxLength={3}
                onChangeText={text => {
                  onChange('bpm', text);
                }}
                rightComponent={
                  <Text style={[styles.inputTitle, styles.rightInput]}>
                    {'    bpm'}
                  </Text>
                }
              />
            </View>
          </View>
        </Card>
        <View style={styles.addNoteContainer}>
          {state.addNoteEnabled ? (
            <TextAreaInput
              placeholder={translate(
                'BloodPressure/Measuring.placeholder_add_note',
              )}
            />
          ) : (
            <Button
              size="small"
              hierarchy="transparent"
              onPress={onEnableAddNote}>
              <Text style={[styles.inputTitle, styles.textLink]}>
                {translate('BloodPressure/Measuring.add_note')}
              </Text>
            </Button>
          )}
        </View>
      </ScrollView>
      <View style={styles.section}>
        <Button
          title={translate('button.save')}
          disabled={!isButtonEnabled}
          onPress={onSubmit}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.secondaryTranslucent,
    borderBottomWidth: 1,
  },
  inputTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
  },
  containerInput: {
    flex: 1,
  },
  rightInput: {
    fontSize: Fonts.size.hint,
    textAlignVertical: 'bottom',
    marginBottom: 6,
  },
  value: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6,
    textAlign: 'right',
  },
  lastRowContainer: {
    borderBottomWidth: 0,
  },
  addNoteContainer: {
    marginTop: 12,
    marginBottom: 21,
  },
  textLink: {
    textAlign: 'left',
    fontFamily: Fonts.type.bold,
  },
});

export default BloodPressureMeasuring;