import React, { useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-toast-message';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { MainScrollView } from '../../components/Layout';
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
  const scrollRef = useRef<ScrollView>();
  const {
    state,
    tabEditorContent,
    formIsComplete,
    updateEditorByUser,
    updatekeywords,
    updateTab,
  } = useSelfCareForm();

  const onSave = () => {
    dispatch(createSelfcareTipThunk(state))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: translate('AddSelfCareTip.successToast'),
          position: 'bottom',
        });
        navigation.goBack();
      })
      .catch(error => {
        const errorInstance = new Error(error?.message);
        errorInstance.name = error.name;
        errorInstance.stack = error.stack;
        crashlytics().recordError(errorInstance);
        Toast.show({
          type: 'error',
          text1: err.msg, // TODO traducir
          position: 'bottom',
        });
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

  let editorInitializedCallback = useCallback(() => {
    richText?.current?.registerToolbar(function (items) {
      // console.log('Toolbar click, selected items (insert end callback):', items);
    });
  }, []);

  let handleCursorPosition = useCallback((scrollY) => {
    // Positioning scroll bar
    console.log("scrollRef?.current", scrollRef?.current !== undefined);
    scrollRef?.current?.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  return (
    <SafeAreaView
      style={[styles.safeView, isDarkMode && styles.darkBackground]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        enabled
        keyboardVerticalOffset={110}>
        <MainScrollView
          ref={scrollRef}
          keyboardDismissMode={'none'}
          nestedScrollEnabled={true}
          style={{ paddingBottom: 80 }}
          scrollEventThrottle={20}>
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
          <RichToolbar
            style={[styles.richBar, isDarkMode && styles.richBarDark]}
            flatContainerStyle={styles.flatStyle}
            editor={richText}
            // disabled={disabled}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#bfbfbf'}
          />
          <RichEditor
            ref={richText}
            initialContentHTML={tabEditorContent}
            enterKeyHint={'done'}
            onChange={descriptionText => {
              updateEditorByUser(state.selectedTab, descriptionText);
            }}
            initialHeight={400}
            editorInitializedCallback={editorInitializedCallback}
            style={styles.rich}
            onCursorPosition={handleCursorPosition}
            editorStyle={{
              backgroundColor: isDarkMode
                ? Colors.darkGrayMode
                : Colors.lightGray,
              color: isDarkMode ? Colors.textNormal : Colors.headline,
            }}
          />
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
        </MainScrollView>
        <RichToolbar
          style={[styles.richBar, isDarkMode && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
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
      </KeyboardAvoidingView>
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
    paddingBottom: 21,
  },
  tabsContainer: {
    marginBottom: 12,
  },
  sectionOverview: {
    marginTop: 16,
    // marginBottom: 80,
  },
  tabsTitle: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: Fonts.size.h6,
    marginBottom: Platform.OS === 'ios' ? 3 : 6,
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: '#191d20',
    borderColor: '#696969',
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
  safeView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default AddSelfCareTipScreen;
