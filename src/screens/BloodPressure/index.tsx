import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { Colors, Fonts, AppStyles } from '../../styles';
import { Button, HeaderChart } from '../../components';
import { BloodPressureCard } from '../../wrappers';
import { BarChart } from '../../components/Charts';

type Props = NativeStackScreenProps<RootStackParamList, 'Home/BloodPressure'>;

const bpdata = [
  { x: 'Lun', y: 120, y0: 90 },
  { x: 'Mar', y: 130, y0: 89 },
  { x: 'Mie', y: 108, y0: 92 },
  { x: 'Jue', y: 124, y0: 90 },
  { x: 'Vie', y: 128, y0: 91 },
  { x: 'Sab', y: 138, y0: 97 },
  { x: 'Dom', y: 118, y0: 100 },
];

const BloodPressureScreen: React.FC<Props> = ({ navigation }) => {
  const navigate = (screen: keyof RootStackParamList) => {
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
          <BloodPressureCard
            title="SYS"
            value="144"
            magnitude="mmHg"
            data={bpdata.map(sys => ({ y: sys.y }))}
          />
          <BloodPressureCard
            title="DIA"
            value="78"
            magnitude="mmHg"
            data={bpdata.map(sys => ({ y: sys.y0 }))}
          />
        </View>
        <View>
          <HeaderChart />
          <BarChart data={bpdata} />
        </View>
        <View style={styles.footer}>
          <Button
            title="Iniciar Medición"
            onPress={() => {
              navigate('BloodPressure/Preparation');
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
