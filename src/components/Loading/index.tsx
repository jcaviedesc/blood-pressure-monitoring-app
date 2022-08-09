import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { Colors, Fonts } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Text } from '../CustomText';

type Props = {
  loadingText?: string;
};

export const DotsLoading = ({ loadingText }: Props) => {
  const { translate } = useI18nLocate();

  return (
    <View style={styles.loadingContainer}>
      <DotIndicator size={12} color={Colors.tertiary} count={3} />
      <View>
        <Text style={styles.loadingText}>
          {loadingText ? loadingText : translate('loading')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 240,
  },
  loadingText: {
    color: Colors.headline,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginTop: 12,
    // textShadowColor: Colors.paragraph,
    // textShadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // textShadowRadius: 5,
  },
});
