import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import SwiperUnits from '../../lib/swiperUnits';
import { AppStyles, Colors, Fonts } from '../../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/BodyInfo'>;

const BodyInfoScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <SwiperUnits
          range={[5, 21]}
          unitStyles={styles.weightUnit}
          activeUnitStyles={styles.activeWeightUnit}
          magnitudeSyles={styles.magnitude}
          onActiveItem={activeItem => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  weightUnit: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  activeWeightUnit: {
    color: Colors.headline,
  },
  magnitude: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
    textAlign: 'center',
  },
});

export default BodyInfoScreen;
