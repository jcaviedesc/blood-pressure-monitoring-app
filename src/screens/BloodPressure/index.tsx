import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles } from '../../styles';
import { BloodPresureCard, Button, BarChart } from '../../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Home/BloodPressure'>;

const sysData = [
  { x: 1, y: 120 },
  { x: 2, y: 130 },
  { x: 3, y: 110 },
  { x: 4, y: 124 },
  { x: 5, y: 128 },
];

const bpdata = [
  { x: 1, y: 120, y0: 90 },
  { x: 2, y: 130, y0: 89 },
  { x: 3, y: 108, y0: 92 },
  { x: 4, y: 124, y0: 90 },
  { x: 5, y: 128, y0: 91 },
  { x: 6, y: 138, y0: 97 },
  { x: 7, y: 118, y0: 100 },
];

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
          <BloodPresureCard
            title="SYS"
            value="144"
            magnitude="mmHg"
            data={sysData}
          />
          <BloodPresureCard
            title="DIA"
            value="78"
            magnitude="mmHg"
            data={sysData}
          />
        </View>
        <View>
          <BarChart data={bpdata} />
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
    color: Colors.paragraph,
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
