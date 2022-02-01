import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { InputToggle, CustomSlider } from '../../components';

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
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.textField}>
              {translate('healt_info_screen.medicine')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: '1' },
              { label: translate('not'), value: '0' },
            ]}
            selected="1"
            onPress={() => { }}
          />
        </View>
        <View style={styles.glucoseContainer}>
          <CustomSlider
            title={translate('healt_info_screen.glucose')}
            magnitude="mg/dL"
            max={200}
          />
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textField: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
  },
  inputTextContainer: {
    width: '60%',
    paddingRight: 9,
  },
  glucoseContainer: {
    marginTop: 18,
  },
});

export default HealtInfoScreen;
