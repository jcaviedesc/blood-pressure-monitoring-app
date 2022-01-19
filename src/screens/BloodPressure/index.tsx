import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Fonts, AppStyles } from '../../styles';
import { Card, Button } from '../../components';

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
          <Card title="SYS" value="144" magnitude="mmHg" />
          <Card title="DIA" value="78" magnitude="mmHg" />
        </View>
      </View>
      <View>
        <Button
          title="Iniciar Medición"
          onPress={() => {
            navigate(RouteName.PREPARATION_READING_BP);
          }}
        />
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
    fontSize: Fonts.size.h3,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 50,
    lineHeight: 54,
    color: Colors.primary,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BloodPressureScreen;
