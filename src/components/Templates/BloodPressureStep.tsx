import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Metrics, AppStyles, Fonts } from '../../styles';

type Props = {
  title: string;
  imageSource: any; // TODO
  description: string;
};

const BloodPressureStepTemplate: React.FC<Props> = ({
  title,
  imageSource,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: { flex: 1, width: Metrics.screenWidth },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: 40,
    lineHeight: 42,
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
});

export default BloodPressureStepTemplate;
