import React from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { Colors, Metrics } from '../../styles';
import { BloodPressureStepTemplate } from '../../components/Templates';
import { Button, Steps } from '../../components';
import { STEPS } from './data';

type Props = NativeStackScreenProps<
  RootStackParamList,
  RouteName.BLOOD_PRESSURE_READING
>;

const BloodPressureStepsScreen: React.FC<Props> = ({ navigation }) => {
  const stepsRef = React.useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const onNext = () => {
    const nextStep = activeStep + 1;
    stepsRef?.current?.scrollToIndex({
      animated: true,
      index: nextStep < 8 ? nextStep : 7,
    });
    setActiveStep(prevStep => prevStep + 1);
  };
  return (
    <View style={styles.overrideMainContainer}>
      <FlatList
        ref={stepsRef}
        data={STEPS}
        renderItem={({ item }) => {
          const { title, image, description } = item;
          return (
            <BloodPressureStepTemplate
              title={title}
              imageSource={image}
              description={description}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={Metrics.screenWidth}
        getItemLayout={(data, index) => ({
          length: Metrics.screenWidth,
          offset: Metrics.screenWidth * index,
          index,
        })}
        scrollEnabled={false}
      />
      <View style={styles.footer}>
        <Button title="Siguiente" onPress={() => { onNext() }} />
      </View>
      <Steps nsteps={8} activeStep={activeStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  overrideMainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    height: 9,
    width: Metrics.screenWidth / 8 - 6,
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 9,
  },
});

export default BloodPressureStepsScreen;
