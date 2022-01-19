import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Button } from '..';
import { Metrics, AppStyles, Fonts, Colors } from '../../styles';

type Props = {
  title: string;
  imageSource: any; // TODO
  description: string;
  onNext: Function;
  activeStep: number;
};

const BloodPressureStepTemplate: React.FC<Props> = ({
  title,
  imageSource,
  description,
  onNext,
  activeStep = 1,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <Button title="Siguiente" onPress={onNext} />
        </View>
      </View>
      <View style={styles.stepContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(step => {
          const stepStyle = {
            ...styles.step,
            backgroundColor: step === activeStep ? Colors.orange : Colors.gray,
          };
          return <View key={step} style={stepStyle} />;
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: { flex: 1 },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 60,
    lineHeight: 63,
    height: 30,
    textAlign: 'center',
  },
  image: {
    width: Metrics.screenWidth - 30,
    maxHeight: Metrics.screenWidth,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: Fonts.type.regular,
    fontSize: 36,
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 9,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    height: 9,
    width: ((Metrics.screenWidth / 8) - 6),
  },
});

export default BloodPressureStepTemplate;
