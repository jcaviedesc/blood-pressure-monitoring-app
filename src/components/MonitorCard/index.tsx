import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import type { Monitor } from '../../store/blood-pressure/types';
import { Fonts, Metrics, Colors } from '../../styles';

const MonitorCard: React.FC<Monitor> = ({
  img,
  brand,
  model,
  measurementSite,
  validationStudy,
  use,
  measurementMethod,
  additional
}) => {
  const { translate } = useI18nLocate();
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: img }}
          resizeMode="contain"
          resizeMethod="scale"
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.description}>
          <View style={styles.brand}>
            <Text style={styles.titleText}>{translate('brand')}</Text>
            <Text style={styles.value}>{brand}</Text>
          </View>
          <View style={styles.model}>
            <Text style={styles.titleText}>{translate('model')}</Text>
            <Text style={styles.value}>{model}</Text>
          </View>
          <View style={styles.use}>
            <Text style={styles.titleText}>{translate('use')}</Text>
            <Text style={styles.normarValue}>{use}</Text>
          </View>
        </View>
        <View style={styles.contentBody}>
          <View style={styles.measurementSite}>
            <Text style={styles.titleText}>{translate('measurementSite')}</Text>
            <Text style={styles.normarValue}>{measurementSite}</Text>
          </View>
          <View style={styles.measurementMethod}>
            <Text style={styles.titleText}>
              {translate('measurementMethod')}
            </Text>
            <Text style={styles.normarValue}>{measurementMethod}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.titleText}>{translate('validationStudy')}</Text>
          <Text style={styles.normarValue}>{validationStudy}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.screenWidth,
  },
  image: {
    width: '100%',
    height: Metrics.screenWidth / 2,
  },
  content: {
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
  },
  value: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
    color: Colors.headline,
    marginBottom: 9,
  },
  normarValue: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
  bodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contentBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    flex: 20,
  },
  model: {
    flex: 30,
    paddingRight: 9,
  },
  use: {
    flex: 50,
  },
  measurementSite: {
    flex: 50,
  },
  measurementMethod: {
    flex: 50,
  },
});

export default MonitorCard;
