import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { BloodPressureSlider, Button } from '../../components';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Meassuring'
>;

const BloodPressureMeassuringScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <BloodPressureSlider />
      </View>
      <View style={styles.section}>
        <Button title={translate('button.save')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default BloodPressureMeassuringScreen;
