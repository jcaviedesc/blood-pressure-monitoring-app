import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { Colors } from '../../styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/HeartRate'
>;

const BloodPressureHeartRateModalScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalCard}>
        <Text>BloodPressureHeartRateModalScreen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: Colors.loadingBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: Colors.background,
    width: '80%',
    height: 60,
  },
});

export default BloodPressureHeartRateModalScreen;
