import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { Colors, AppStyles, Fonts } from '../../styles';
import { Button } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Preparation'
>;

const PreparationBloodPressureMeasureScreen: React.FC<Props> = ({
  navigation,
}) => {
  const [isEnabled, setIsEnabled] = useState([false, false, false]);
  const toggleSwitch = (toggle: number) => {
    setIsEnabled(previousState => {
      const newPreparationState = [...previousState];
      newPreparationState[toggle] = !newPreparationState[toggle];
      return newPreparationState;
    });
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={[styles.content, styles.contentOverride]}>
        <View>
          <Text style={styles.title}>
            PREPARACIÓN ANTES DE MEDIR LA PRESIÓN ARTERIAL
          </Text>
        </View>
        <View style={styles.mainCheckContainer}>
          <View style={styles.checkContainer}>
            <View style={styles.checkTextContainer}>
              <Text style={styles.checkText}>
                {
                  'Descansar en una silla, en un ambiente tranquilo durante 5 minutos.'
                }
              </Text>
            </View>
            <View style={styles.swithcContainer}>
              <Switch
                trackColor={{
                  false: Colors.gray,
                  true: Colors.cardHightlight,
                }}
                thumbColor={isEnabled[0] ? Colors.tertiary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch(0)}
                value={isEnabled[0]}
              />
            </View>
          </View>
          <View style={styles.checkContainer}>
            <View style={styles.checkTextContainer}>
              <Text style={styles.checkText}>Tener la vejiga vacía.</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.gray, true: Colors.cardHightlight }}
              thumbColor={isEnabled[1] ? Colors.tertiary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(1)}
              value={isEnabled[1]}
            />
          </View>
          <View style={styles.checkContainer}>
            <View style={styles.checkTextContainer}>
              <Text style={styles.checkText}>
                {'No haber comido, ingerido bebidas con cafeína, fumado ni haber' +
                  ' practicado ninguna actividad física en los 30 minutos anteriores' +
                  'a la toma de la presión arterial.'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: Colors.gray, true: Colors.cardHightlight }}
              thumbColor={isEnabled[2] ? Colors.tertiary : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch(2)}
              value={isEnabled[2]}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title="Empezar"
            onPress={() => {
              navigation.navigate('BloodPressure/Steps');
            }}
            disabled={isEnabled.some(e => !e)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contentOverride: {
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    color: Colors.headline,
    textAlign: 'left',
  },
  mainCheckContainer: {
    flex: 40,
    marginTop: 27,
    marginBottom: 30,
  },
  checkText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'justify',
    paddingRight: 12,
  },
  checkContainer: {
    marginBottom: 18,
  },
  checkTextContainer: {
    flex: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 21,
  },
  swithcContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default PreparationBloodPressureMeasureScreen;
