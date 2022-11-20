import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, View, Platform, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { Input, Button } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { signUpSchema, transformError } from './schemaValidators/signup';
import { MainContainer } from '../../components/Layout';
import { useBackHandler } from '../../hooks/back-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { name, lastName, docId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // local state
  const [inputErrors, setInputErrors] = useState({});

  const dispatchAction = (userField: string, value: string) => {
    // name.trimStart().trimEnd()
    dispatch(updateUserField({ field: userField, value: value }));
  };

  async function nextRoute() {
    const { error } = signUpSchema.validate(
      { name, lastName, docId },
      { abortEarly: false },
    );
    if (error) {
      const errorTransform = transformError(error);
      setInputErrors(errorTransform);
    } else {
      navigation.navigate('SignUp/BirthDate');
    }
  }

  const backHandler = useCallback(() => {
    Alert.alert(
      translate('singup.on_back_title'),
      translate('singup.on_back_description'),
      [
        {
          text: translate('singup.on_back_cancel'),
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                // TODO clear data
                navigation.navigate('Welcome');
              });
          },
          style: 'cancel',
        },
        {
          text: translate('singup.on_back_continue'),
          onPress: () => null,
        },
      ],
    );
    return true;
  }, [navigation, translate]);

  useBackHandler(backHandler);
  console.log('porque hay cambio en SignUpScreen');
  return (
    <MainContainer isScrollView>
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
              hint={inputErrors?.docId ?? translate('singup.document_id_hint')}
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 20,
    marginTop: Platform.OS === 'android' ? 60 : 70,
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
