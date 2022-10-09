import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RichEditor } from 'react-native-pell-rich-editor';
import type { RootStackParamList } from '../../router/types';
import { Avatar, InputToggle, Text } from '../../components';
import { Colors } from '../../styles';
import { AppStyles } from '../../styles';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailSelfCare'>;

const DetailSelfCareScreen: React.FC<Props> = ({ navigation, route }) => {
  const { owner, editor } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedTab, setSelectedTab] = useState('patient');
  const { translate } = useI18nLocate();
  const richText = useRef<RichEditor>();

  useEffect(() => {
    richText.current?.setContentHTML(editor[selectedTab]);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [selectedTab]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <InputToggle
            selected={selectedTab}
            options={[
              {
                label: translate('AddSelfCareTip.tabs.patients'),
                value: 'patient',
              },
              {
                label: translate('AddSelfCareTip.tabs.professionals'),
                value: 'professional',
              },
            ]}
            onPress={({ value }) => {
              setSelectedTab(value);
            }}
          />
        </View>
        <RichEditor
          ref={richText}
          initialContentHTML={editor[selectedTab]}
          enterKeyHint={'done'}
          disabled
          editorStyle={{
            backgroundColor: isDarkMode
              ? Colors.darkCardBackground
              : Colors.cardBackground,
            color: isDarkMode ? Colors.textNormal : Colors.headline,
          }}
        />
        <View style={styles.owner}>
          <Text>{translate('detail_self_care.owner')}</Text>
        </View>
        <View style={styles.header}>
          <Avatar avatarUri={owner?.avatar} size={30} />
          <View style={styles.headerContent}>
            <Text style={styles.subTitleScreen}>{owner.name}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  header: {
    flexDirection: 'row',
    marginHorizontal: 6,
    height: 40,
  },
  headerContent: {
    marginLeft: 9,
  },
  owner: {
    marginVertical: 12,
  },
  tabsContainer: {
    marginTop: 15,
    marginBottom: 21,
  },
});

export default DetailSelfCareScreen;
