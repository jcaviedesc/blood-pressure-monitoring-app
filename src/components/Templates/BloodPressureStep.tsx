import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import HighlightText from '@sanar/react-native-highlight-text';
import { Metrics, AppStyles, Fonts, Colors } from '../../styles';

type Props = {
  title: string;
  imageSource: any; // TODO
  description: string;
  searchWords?: Array<string>;
};

const BloodPressureStepTemplate: React.FC<Props> = ({
  title,
  imageSource,
  description,
  searchWords = [''],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.description}>
          <HighlightText
            highlightStyle={styles.highLigh}
            searchWords={searchWords}
            textToHighlight={description}
          />
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: { flex: 1, width: Metrics.screenWidth },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    textAlign: 'center',
    color: Colors.headline,
  },
  image: {
    width: Metrics.screenWidth - 30,
    maxHeight: Metrics.screenWidth,
    resizeMode: 'contain',
  },
  description: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h4,
    textAlign: 'center',
    color: Colors.paragraph,
  },
  highLigh: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
  },
});

export default BloodPressureStepTemplate;
