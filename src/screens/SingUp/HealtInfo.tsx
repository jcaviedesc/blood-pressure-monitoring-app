import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/HealtInfo'>;

const HealtInfoScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  return (
    <ScrollView style={styles.mainContainerWitoutHeader}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {translate('healt_info_screen.title')}
          </Text>
        </View>
        <View>
          <Text>{translate('healt_info_screen.medicine')}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginHorizontal: Metrics.marginHorizontal,
  },
});

export default HealtInfoScreen;
