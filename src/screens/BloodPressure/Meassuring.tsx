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
  'BloodPressure/Meassuring'
>;

const BloodPressureMeassuring: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { saveMeasurement } = useBloodPressureMeasurement();
  // const dispatch = useAppDispatch();
  const { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord } =
    useMeasuringForm();
  const { setHeaderTitleShow, fadeAnim } = useTitleScroll(
    navigation,
    translate('BloodPressure/Meassuring.header_title'),
  );
  const [diaRef, bpmRef] = [useRef<TextInput>(), useRef<TextInput>()];

  const onSubmit = () => {
    const record = selectRecord();
    console.log(record);
    saveMeasurement(record);
    navigation.navigate('Home/BloodPressure');
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
            {translate('BloodPressure/Meassuring.title')}
          </Text>
        </Animated.View>
        <Card>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.inputTitle}>
                {translate('BloodPressure/Meassuring.date')}
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
                {translate('BloodPressure/Meassuring.time')}
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
                {translate('BloodPressure/Meassuring.sys')}
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
                rigthComponent={
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
                {translate('BloodPressure/Meassuring.dia')}
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
                rigthComponent={
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
                {translate('BloodPressure/Meassuring.heart_rate')}
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
                rigthComponent={
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
                'BloodPressure/Meassuring.placeholder_add_note',
              )}
            />
          ) : (
            <Button
              size="small"
              hierarchy="transparent"
              onPress={onEnableAddNote}>
              <Text style={[styles.inputTitle, styles.textLink]}>
                {translate('BloodPressure/Meassuring.add_note')}
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
    width: '47%',
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

export default BloodPressureMeassuring;
