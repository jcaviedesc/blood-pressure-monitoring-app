import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Images, Colors } from '../../../styles';
import { BloodPressureStepTemplate } from '../../../components/Templates';

const BloodPressureStepOneScreen = () => {
  return (
    <View style={styles.overrideMainContainer}>
      <BloodPressureStepTemplate
        title="No Conversar"
        imageSource={Images.noTalkStep1}
        description="Hablar o escuchar de forma
activa agrega hasta 10 mmHg"
        onNext={() => { }}
        activeStep={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  overrideMainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default BloodPressureStepOneScreen;
