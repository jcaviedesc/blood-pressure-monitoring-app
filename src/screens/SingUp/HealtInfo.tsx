import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateHealtInfo } from '../../store/singup/singupSlice';
import { HealtInfoAction } from '../../store/singup/types';
import { InputToggle, Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/HealtInfo'>;

const HealtInfoScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { healtInfo } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onSelectHealtOption = (
    key: HealtInfoAction['field'],
    value: HealtInfoAction['value'],
  ) => {
    dispatch(updateHealtInfo({ field: key, value }));
  };

  const onNext = () => {
    const isCompleteForm = !Object.values(healtInfo).some(
      value => value === '',
    );
    if (isCompleteForm) {
      navigation.navigate('Singup/ProfilePicture');
    }
  };

  return (
    <ScrollView style={styles.mainContainerWitoutHeader}>
      <View style={styles.content}>
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
              selected={healtInfo.medicine}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption(
                  'medicine',
                  value as HealtInfoAction['value'],
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
              selected={healtInfo.smoke}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption('smoke', value as HealtInfoAction['value']);
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
              selected={healtInfo.heartAttack}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption(
                  'heartAttack',
                  value as HealtInfoAction['value'],
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
              selected={healtInfo.thrombosis}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption(
                  'thrombosis',
                  value as HealtInfoAction['value'],
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
              selected={healtInfo.nephropathy}
              options={[
                { label: translate('yes'), value: 'yes' },
                { label: translate('not'), value: 'not' },
                { label: translate('do_not_know'), value: 'not know' },
              ]}
              onPress={({ value }) => {
                onSelectHealtOption(
                  'nephropathy',
                  value as HealtInfoAction['value'],
                );
              }}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button title={translate('button.next')} onPress={onNext} />
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 12,
    minHeight: 50,
  },
  inputText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    textAlign: 'justify',
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

export default HealtInfoScreen;
