import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HighlightText from '@sanar/react-native-highlight-text';
import type { RootStackParamList } from '../../router/types';
import { Colors, AppStyles, Fonts, Images } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useTimer } from '../../hooks/useTimer';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Preparation'
>;

const PreparationBloodPressureMeasureScreen: React.FC<Props> = ({
  navigation,
}) => {
  const { translate } = useI18nLocate();
  const { timer } = useTimer(1000, 10);

  return (
    <MainContainer isScrollView>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {translate('BloodPressure/Preparation.title')}
          </Text>
        </View>
        <View style={styles.mainCheckContainer}>
          <View style={[styles.checkContainer, styles.chairContainer]}>
            <View style={styles.chairTextContainer}>
              <Text style={styles.checkText}>
                <HighlightText
                  highlightStyle={styles.highlightText}
                  searchWords={translate(
                    'BloodPressure/Preparation.p2HighligthText',
                  )}
                  textToHighlight={translate('BloodPressure/Preparation.p2')}
                />
              </Text>
            </View>
            <View>
              <Image source={Images.chair} style={styles.chairImage} />
            </View>
          </View>
          <View style={styles.checkContainer}>
            <Text style={styles.checkText}>
              <HighlightText
                highlightStyle={styles.highlightText}
                searchWords={translate(
                  'BloodPressure/Preparation.p1HighligthText',
                )}
                textToHighlight={translate('BloodPressure/Preparation.p1')}
              />
            </Text>
          </View>
          <View style={styles.checkContainer}>
            <View style={styles.imagesContainerRow}>
              <Image source={Images.notCofee} style={styles.noCofeeImage} />
              <Image source={Images.notSmoking} style={styles.noCofeeImage} />
              <Image source={Images.notRunning} style={styles.noCofeeImage} />
            </View>
            <Text style={styles.checkText}>
              <HighlightText
                highlightStyle={styles.highlightText}
                searchWords={translate(
                  'BloodPressure/Preparation.p3HighligthText',
                )}
                textToHighlight={translate('BloodPressure/Preparation.p3')}
              />
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={timer > 0 ? `Empezar en (${timer})` : 'Empezar'}
            onPress={() => {
              navigation.navigate('BloodPressure/Steps');
            }}
            disabled={timer > 0}
          />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contentOverride: {
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    color: Colors.headline,
    textAlign: 'left',
  },
  mainCheckContainer: {
    marginTop: 27,
    marginBottom: 30,
  },
  checkText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'left',
  },
  checkContainer: {
    marginBottom: 18,
  },
  highlightText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
  },
  chairImage: {
    resizeMode: 'contain',
    width: 128,
    height: 128,
  },
  footer: {
    justifyContent: 'flex-end',
    marginBottom: 21,
  },
  chairContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  chairTextContainer: {
    flex: 90,
  },
  noCofeeImage: {
    resizeMode: 'contain',
    width: 92,
    height: 92,
  },
  imagesContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default PreparationBloodPressureMeasureScreen;
