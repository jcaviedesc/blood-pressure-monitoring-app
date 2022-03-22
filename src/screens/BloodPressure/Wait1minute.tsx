import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { AppStyles, Colors, Fonts, Metrics } from '../../styles';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/Wait1minute'
>;
const renderTime = (title: string, subtitle: string) => {
  return ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text style={styles.timerText}>Too lale...</Text>;
    }

    return (
      <View style={styles.timerContainerText}>
        <Text style={styles.timerText}>{title}</Text>
        <Text style={[styles.timerText, styles.timerNumber]}>{remainingTime}</Text>
        <Text style={styles.timerText}>{subtitle}</Text>
      </View>
    );
  };
};

const Wait1MinuteScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{translate('wait1minute.title')}</Text>
        </View>
        <View style={styles.counterContainer}>
          <CountdownCircleTimer
            isPlaying
            // initialRemainingTime={60}
            duration={60}
            size={Metrics.screenWidth - Metrics.marginHorizontal * 6}
            colors={[
              Colors.button,
              '#F7B801',
              Colors.tertiary,
              Colors.tertiary,
            ]}
            strokeWidth={18}
            colorsTime={[45, 30, 15, 0]}
            onComplete={() => {
              navigation.navigate('BloodPressure/MeassuringA');
            }}>
            {renderTime(
              translate('wait1minute.remaining'),
              translate('wait1minute.seconds'),
            )}
          </CountdownCircleTimer>
        </View>
        <View>
          <Text style={styles.description}>
            {translate('wait1minute.description')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  timerText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h3,
    color: Colors.headline,
  },
  counterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerContent: {
    marginVertical: 60,
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h3,
    textAlign: 'center',
    color: Colors.headline,
  },
  timerNumber: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
  },
  timerContainerText: {
    alignItems: 'center',
  },
  description: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h4,
    color: Colors.paragraph,
  },
});

export default Wait1MinuteScreen;
