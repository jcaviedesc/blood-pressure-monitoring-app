import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { signUpSchema, transformError } from './schemaValidators/signup';
import { MainContainer } from '../../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const isDarkMode = useColorScheme() === 'dark';
  const { name, lastName, docId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // local state
  const [inputErrors, setInputErrors] = useState({});

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ field: userField, value: value.trimEnd() }));
  };

  async function nextRoute() {
    const { error } = signUpSchema.validate(
      { name, lastName, docId },
      { abortEarly: false },
    );

    console.log("SignUpScreen", error);
    if (error) {
      const errorTransform = transformError(error);
      setInputErrors(errorTransform);
    } else {
      navigation.navigate('Singup/Birthdate');
    }
  }

  return (
    <MainContainer isScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleScreen}>{translate('singup.title')}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subTitleScreen}>
              {translate('singup.subtitle')}
            </Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.inputSection}>
              <Input
                title={translate('singup.name')}
                value={name}
                onChangeText={text => {
                  dispatchAction('name', text);
                }}
                autoFocus
                hasError={inputErrors?.name}
                hint={inputErrors?.name}
              />
            </View>

            <View style={styles.inputSection}>
              <Input
                title={translate('singup.lastName')}
                value={lastName}
                onChangeText={text => {
                  dispatchAction('lastName', text);
                }}
                autoFocus
                hasError={inputErrors?.lastName}
                hint={inputErrors?.lastName}
              />
            </View>

            <View style={styles.inputSection}>
              <Input
                title={translate('singup.document_id')}
                value={docId}
                keyboardType="numeric"
                onChangeText={text => {
                  dispatchAction('docId', text);
                }}
                hasError={inputErrors?.docId}
                hint={
                  inputErrors?.docId ?? translate('singup.document_id_hint')
                }
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              title={translate('button.next')}
              onPress={() => {
                nextRoute();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 20,
  },
  subtitleContainer: {
    marginTop: 9,
    marginBottom: 15,
  },
  inputSection: {
    marginTop: 12,
  },
  bodyContainer: {
    flex: 40,
  },
  footer: {
    flex: 20,
    paddingTop: 60,
    paddingBottom: 30,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
});

export default SignUpScreen;
