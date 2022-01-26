import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles } from '../../styles';
import { BloodPresureCard, Button } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Home/BloodPressure'>;

const BloodPressureScreen: React.FC<Props> = ({ navigation }) => {
  const navigate = (screen: RouteName) => {
    navigation.navigate(screen);
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.contenHeder}>
          <Text style={styles.statics}>Estadísticas</Text>
          <Text style={styles.title}>Presión Arterial</Text>
        </View>
        <View style={styles.cardContainer}>
          <BloodPresureCard title="SYS" value="144" magnitude="mmHg" />
          <BloodPresureCard title="DIA" value="78" magnitude="mmHg" />
        </View>
        <View style={styles.footer}>
          <Button
            title="Iniciar Medición"
            onPress={() => {
              navigate(RouteName.PREPARATION_READING_BP);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contenHeder: {
    marginBottom: 10,
  },
  statics: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    color: Colors.headline,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 30,
  },
});

export default BloodPressureScreen;
