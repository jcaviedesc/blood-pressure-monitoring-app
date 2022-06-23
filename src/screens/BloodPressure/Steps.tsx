import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { Colors, Metrics } from '../../styles';
import { BloodPressureStepTemplate } from '../../components/Templates';
import type { BloodPressureStepProps } from '../../components/Templates/BloodPressureStep';
import { Button } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useTimer } from '../../hooks/useTimer';

type Props = NativeStackScreenProps<RootStackParamList, 'BloodPressure/Steps'>;

type stepRef = {
  scrollToIndex: ({ }) => void;
};

const totalStepsIndex = 7;

const BloodPressureStepsScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const stepsData = useMemo(() => {
    return translate(
      'BloodPressure/Steps.steps',
    ) as unknown as BloodPressureStepProps[];
  }, [translate]);
  const stepsRef = React.useRef<stepRef>();
  const [activeStep, setActiveStep] = React.useState(1);
  const { timer, resetTimer } = useTimer(1000, 5);

  useEffect(() => {
    navigation.setOptions({ activeStep });
  }, [navigation, activeStep]);

  const onNext = () => {
    const nextStep = activeStep;
    if (nextStep > totalStepsIndex) {
      navigation.navigate('BloodPressure/Meassuring');
    } else {
      stepsRef?.current?.scrollToIndex({
        animated: true,
        index: nextStep,
      });
      setActiveStep(prevStep => prevStep + 1);
      resetTimer();
    }
  };
  return (
    <View style={styles.overrideMainContainer}>
      <FlatList
        ref={stepsRef}
        data={stepsData}
        renderItem={({ item }) => {
          const { title, image, description, highLighWord } = item;
          return (
            <BloodPressureStepTemplate
              title={title}
              imageSource={image}
              description={description}
              searchWords={highLighWord}
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
        <Button
          title={
            timer > 0
              ? translate('button.nextin', { countDown: timer })
              : activeStep >= totalStepsIndex
                ? translate('button.start')
                : translate('button.next')
          }
          onPress={() => {
            onNext();
          }}
          disabled={timer > 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overrideMainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 9,
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
    paddingHorizontal: Metrics.marginHorizontal,
  },
});

export default BloodPressureStepsScreen;
