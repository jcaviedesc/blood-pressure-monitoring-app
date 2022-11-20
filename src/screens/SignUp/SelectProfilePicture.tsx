import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actions-sheet';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
} from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Images, Metrics, Fonts, Colors } from '../../styles';
import { Button, Text } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { signUpUser } from '../../thunks/users-thunk';
import { useMainApp } from '../../main/hooks';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { setScreenLoading } from '../../store/app/appSlice';

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'SignUp/ProfilePicture'
>;

const defaulPictureOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  quality: 0.7,
  includeExtra: false, // TODO ver que permisos se necesitan para habilitar esta opcion
};

const requestCameraPermission = async () => {
  try {
    // TODO add translations
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'BettiOn App Camera Permission',
        message:
          'BettiOn App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      crashlytics().log('Bettion can use the camera');
    } else {
      crashlytics().log('Camera permission denied');
    }
  } catch (error) {
    crashlytics().recordError(error);
    console.warn(err);
  }
};

const SelectProfilePictureScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { registerUser } = useMainApp();
  const { id: userId, picture, userType } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const actionSheetRef = useRef<actionSheetRef>();

  useEffect(() => {
    crashlytics().setUserId(`${userId}`);
  }, [userId]);

  const onSelectPicture = () => {
    actionSheetRef.current?.setModalVisible();
  };

  const setUriPhoto = (result: ImagePickerResponse) => {
    if (result.errorMessage) {
      const error = new Error(result.errorMessage);
      // https://github.com/react-native-image-picker/react-native-image-picker#errorcode
      crashlytics()
        .setAttribute('errorCode', String(result.errorCode))
        .then(() => {
          crashlytics().recordError(error);
        });

      // TODO show error
    } else {
      const { assets } = result;
      const photo = assets && assets[0];
      const payload = {
        field: 'picture',
        value: { uri: photo?.uri! || '', type: photo?.type! },
      };
      // TODO search assignable problem
      dispatch(updateUserField(payload));
    }
  };

  const onLaunchCamera = async () => {
    if (Platform.OS === 'android') {
      const cameraAvailable = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (!cameraAvailable) {
        await requestCameraPermission();
      }
    }
    actionSheetRef.current?.hide();
    const result = await launchCamera(defaulPictureOptions);
    setUriPhoto(result);
  };

  const onChooseImage = async () => {
    actionSheetRef.current?.hide();
    try {
      const result = await launchImageLibrary(defaulPictureOptions);
      setUriPhoto(result);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const onNext = async () => {
    dispatch(setScreenLoading(true));
    dispatch(signUpUser(navigation))
      .then(() => {
        registerUser();
      })
      .finally(() => {
        dispatch(setScreenLoading(false));
      });
  };

  return (
    <MainContainer>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{translate('selectAvatar.title')}</Text>
        </View>
        <View style={styles.pictureContainer}>
          <TouchableHighlight
            onPress={onSelectPicture}
            style={styles.touchPicture}
            underlayColor={Colors.background}>
            <View>
              <Image
                source={picture.uri ? picture : Images.userPlaceholder}
                style={styles.picture}
              />
              <Text
                style={{
                  ...styles.addPicture,
                  color: picture.uri
                    ? Colors.darkBackground
                    : Colors.buttonText,
                }}>
                {picture.uri !== ''
                  ? translate('selectAvatar.modify')
                  : translate('selectAvatar.add')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          {userType !== 'patient' && (
            <Button
              title="siguiente"
              onPress={onNext}
              disabled={picture.uri === ''}
            />
          )}
          {userType === 'patient' && (
            <View style={styles.omitButton}>
              <Button hierarchy="quiet" title="omitir" onPress={onNext} />
            </View>
          )}
        </View>
      </View>
      <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={styles.actionSheet}>
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={onLaunchCamera}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="camera" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>
                {translate('selectAvatar.take_photo')}
              </Text>
            </View>
          </TouchableHighlight>
          {/* revisar porque no funciona */}
          {/* <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={onChooseImage}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="photo" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>
                {translate('selectAvatar.Seleccionar de mi galeria')}
              </Text>
            </View>
          </TouchableHighlight> */}
        </View>
      </ActionSheet>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  ...AppStyles.withActionsheet,
  title: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.headline,
    marginBottom: 31,
    marginTop: 21,
  },
  picture: {
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenWidth * 0.7,
    resizeMode: 'cover',
  },
  pictureContainer: {
    alignItems: 'center',
    flex: 10,
  },
  addPicture: {
    position: 'absolute',
    bottom: 30,
    color: Colors.buttonText,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    left: (Metrics.screenWidth * 0.7 - 85) / 2,
    width: 87,
    textShadowColor: Colors.paragraph,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  touchPicture: {
    position: 'relative',
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenWidth * 0.7,
    borderRadius: Metrics.screenWidth * 0.7,
    borderColor: Colors.stroke,
    borderWidth: 1,
    overflow: 'hidden',
  },
  footer: {
    flex: 5,
    paddingBottom: 30,
    paddingHorizontal: Metrics.marginHorizontal,
    justifyContent: 'flex-end',
  },
  omitButton: {
    paddingTop: 21,
  },
});

export default SelectProfilePictureScreen;
