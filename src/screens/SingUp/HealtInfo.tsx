import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Fonts, Colors, Metrics } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { InputToggle, Button } from '../../components';

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
            <Text style={styles.inputText}>
              {translate('healt_info_screen.medicine')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: 'yes' },
              { label: translate('not'), value: 'not' },
            ]}
            onPress={() => { }}
          />
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.smoke')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: 'yes' },
              { label: translate('not'), value: 'not' },
            ]}
            onPress={() => { }}
          />
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.heart_attack')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: 'yes' },
              { label: translate('not'), value: 'not' },
            ]}
            onPress={() => { }}
          />
        </View>
        <View style={styles.toggleContainer}>
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.thrombosis')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: 'yes' },
              { label: translate('not'), value: 'not' },
            ]}
            onPress={() => { }}
          />
        </View>
        <View style={[styles.toggleContainer, styles.toggleContainerOverride]}>
          <View style={[styles.inputTextContainer, styles.inputTextContainerFull]}>
            <Text style={styles.inputText}>
              {translate('healt_info_screen.nephropathy')}
            </Text>
          </View>
          <InputToggle
            options={[
              { label: translate('yes'), value: 'yes' },
              { label: translate('not'), value: 'not' },
              { label: translate('do_not_know'), value: 'not know' },
            ]}
            onPress={() => { }}
          />
        </View>
        <View style={styles.footer}>
          <Button title={translate('button.next')} onPress={() => { }} />
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
    justifyContent: 'flex-end',
    marginBottom: 12,
    minHeight: 50,
  },
  inputText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
  },
  inputTextContainer: {
    width: '70%',
    marginBottom: 9,
  },
  inputTextContainerFull: {
    width: '100%',
  },
  toggleContainerOverride: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  footer: {
    marginTop: 18,
    marginBottom: 12,
  },
});

export default HealtInfoScreen;
