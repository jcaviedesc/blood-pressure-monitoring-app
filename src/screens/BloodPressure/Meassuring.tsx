import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { BloodPressureSlider, Button } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Meassuring'
>;

const BloodPressureMeassuringScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <BloodPressureSlider />
      </View>
      <View style={styles.section}>
        <Button title="save" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default BloodPressureMeassuringScreen;
