import React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectUser,
  updateHealthQuestions,
} from '../../store/signup/signupSlice';
import { HealthInfoAction } from '../../store/signup/types';
import { InputToggle, Button, Text } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'SignUp/HealthQuestions'
>;

const HealthQuestionsScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { healthQuestions: healthQuestions } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectHealthOption = (
    key: HealthInfoAction['field'],
    value: HealthInfoAction['value'],
  ) => {
    dispatch(updateHealthQuestions({ field: key, value }));
  };

  const onNext = () => {
    const isCompleteForm = !Object.values(healthQuestions).some(
      value => value === '',
    );
    if (isCompleteForm) {
      navigation.navigate('SignUp/ProfilePicture');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.title}>
            {translate('healt_info_screen.title')}
          </Text>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.medicine')}
            </Text>
          </View>
          <View style={styles.inputToggleContainer}>
            <InputToggle
              selected={healthQuestions.medicine}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealthOption(
                  'medicine',
                  value as HealthInfoAction['value'],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.smoke')}
            </Text>
          </View>
          <View style={styles.inputToggleContainer}>
            <InputToggle
              selected={healthQuestions.smoke}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealthOption(
                  'smoke',
                  value as HealthInfoAction['value'],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.heart_attack')}
            </Text>
          </View>
          <View style={styles.inputToggleContainer}>
            <InputToggle
              selected={healthQuestions.heartAttack}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealthOption(
                  'heartAttack',
                  value as HealthInfoAction['value'],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.thrombosis')}
            </Text>
          </View>
          <View style={styles.inputToggleContainer}>
            <InputToggle
              selected={healthQuestions.thrombosis}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealthOption(
                  'thrombosis',
                  value as HealthInfoAction['value'],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.nephropathy')}
            </Text>
          </View>
          <View style={styles.inputToggleContainer}>
            <InputToggle
              selected={healthQuestions.nephropathy}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealthOption(
                  'nephropathy',
                  value as HealthInfoAction['value'],
                );
              }}
            />
          </View>
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
  inputText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    textAlign: 'left',
  },
  inputTextContainer: {
    marginBottom: 9,
    marginRight: 6,
  },
  inputToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footer: {
    marginTop: 18,
    marginBottom: 12,
  },
});

export default HealthQuestionsScreen;
