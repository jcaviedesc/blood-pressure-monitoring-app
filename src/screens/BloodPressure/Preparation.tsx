import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { Colors, AppStyles, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button } from '../../components';
import { MainContainer } from '../../components/Layout';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Preparation'
>;

const PreparationBloodPressureMeasureScreen: React.FC<Props> = ({
  navigation,
}) => {
  const { translate } = useI18nLocate();
  const [isEnabled, setIsEnabled] = useState([false, false, false]);
  const [continueTimer, setContinueTimer] = useState(21);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setContinueTimer(timer => timer - 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (continueTimer >= 30) {
      clearInterval(timerRef.current);
    }
  }, [continueTimer]);

  const toggleSwitch = (toggle: number) => {
    setIsEnabled(previousState => {
      const newPreparationState = [...previousState];
      newPreparationState[toggle] = !newPreparationState[toggle];
      return newPreparationState;
    });
  };
  return (
    <MainContainer isScrollView>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {translate('BloodPressure/Preparation.title')}
          </Text>
        </View>
        <View style={styles.mainCheckContainer}>
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>
              {translate('BloodPressure/Preparation.p2')}
            </Text>
          </View>
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>
              {translate('BloodPressure/Preparation.p1')}
            </Text>
          </View>
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>
              {translate('BloodPressure/Preparation.p3')}
            </Text>
          </View>

        </View>
        <View style={styles.footer}>
          <Button
            title={
              continueTimer > 0 ? `Empezar en (${continueTimer})` : 'Empezar'
            }
            onPress={() => {
              navigation.navigate('BloodPressure/Steps');
            }}
            disabled={continueTimer > 0}
          />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contentOverride: {
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    color: Colors.headline,
    textAlign: 'left',
  },
  mainCheckContainer: {
    marginTop: 27,
    marginBottom: 30,
  },
  checkText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'left',
    paddingRight: 12,
  },
  checkContainer: {
    marginBottom: 18,
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 21,
  },
});

export default PreparationBloodPressureMeasureScreen;
