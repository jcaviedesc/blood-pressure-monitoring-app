import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { MainContainer } from '../../components/Layout';
import { Button, Input, InputToggle, Text } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useSelfCareForm } from './hooks/selfCareForm';
import { useAppDispatch } from '../../hooks';
import { createSelfcareTipThunk } from '../../thunks/selfcare/selfcare-thunk';

type Props = NativeStackScreenProps<RootStackParamList, 'AddSelfCareTip'>;

const AddSelfCareTipScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  const richText = useRef<RichEditor>();
  const [showRichToolbar, setShowRichToolbar] = useState(false);
  const {
    state,
    tabEditorContent,
    formIsComplete,
    updateEditorByUser,
    updatekeywords,
    updateTab,
  } = useSelfCareForm();

  const onSave = () => {
    dispatch(createSelfcareTipThunk(state)).then(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    richText.current?.setContentHTML(tabEditorContent);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [state.selectedTab]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: translate('TabsSearch.header.title'),
      headerLeft: () => {
        return Platform.OS === 'ios' ? (
          <Button
            hierarchy="transparent"
            title={translate('button.cancel')}
            size="small"
            onPress={() => {
              navigation.goBack();
            }}
          />
        ) : null;
      },
      headerRight: () => {
        return Platform.OS === 'ios' ? (
          <Button
            hierarchy="transparent"
            title={translate('button.save')}
            size="small"
            onPress={onSave}
            disabled={!formIsComplete}
          />
        ) : null;
      },
    });
  }, [navigation, formIsComplete]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainContainer isScrollView>
        <View style={styles.content}>
          <View style={styles.tabsContainer}>
            <Text style={[styles.inputTitle, styles.tabsTitle]}>
              {translate('AddSelfCareTip.aimed_at')}
            </Text>
            <InputToggle
              selected={state.selectedTab}
              options={[
                {
                  label: translate('AddSelfCareTip.tabs.patients'),
                  value: 'patients',
                },
                {
                  label: translate('AddSelfCareTip.tabs.professionals'),
                  value: 'professionals',
                },
              ]}
              onPress={({ value }) => {
                updateTab(value);
              }}
            />
          </View>
          <View style={styles.richEditorContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, paddingBottom: 21, }}>
              <Text style={styles.inputTitle}>
                {translate('AddSelfCareTip.description')}
              </Text>
              <RichEditor
                ref={richText}
                initialContentHTML={tabEditorContent}
                onChange={descriptionText => {
                  updateEditorByUser(state.selectedTab, descriptionText);
                }}
                onFocus={() => {
                  setShowRichToolbar(true);
                }}
                onBlur={() => {
                  setShowRichToolbar(false);
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                initialHeight={280}
                editorStyle={{
                  backgroundColor: isDarkMode
                    ? Colors.darkGrayMode
                    : Colors.lightGray,
                  color: isDarkMode ? Colors.textNormal : Colors.headline,
                }}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={styles.sectionOverview}>
            <Input
              title={translate('AddSelfCareTip.keywords')}
              hint={translate('AddSelfCareTip.keywords_hints')}
              onChangeText={text => {
                updatekeywords(text);
              }}
            />
          </View>
          {Platform.OS === 'android' && formIsComplete && (
            <Button title={translate('button.save')} onPress={onSave} />
          )}
        </View>
      </MainContainer>
      {showRichToolbar && (
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.heading1,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.insertLink,
          ]}
          selectedIconTint={Colors.tertiary}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={{ color: tintColor }}>H1</Text>
            ),
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  inputTitle: {
    marginLeft: 3,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
    color: Colors.headline,
  },
  richEditorContainer: {
    flex: 1,
  },
  tabsContainer: {
    marginBottom: 12,
  },
  sectionOverview: {
    marginTop: 16,
  },
  tabsTitle: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: Fonts.size.h6,
    marginBottom: Platform.OS === 'ios' ? 3 : 6,
  },
});

export default AddSelfCareTipScreen;
