import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from 'react-native';
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
import { Button } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/signup/signupSlice';
import { finishSignUpUser } from '../../thunks/sign-up-thunk';

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Singup/ProfilePicture'
>;

const defaulPictureOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  quality: 0.7,
  includeExtra: true,
};

const requestCameraPermission = async () => {
  try {
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
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const SelectProfilePictureScreen: React.FC<Props> = ({ navigation }) => {
  const { picture } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const actionSheetRef = useRef<actionSheetRef>();

  const onSelectPicture = () => {
    actionSheetRef.current?.setModalVisible();
  };

  const setUriPhoto = (result: ImagePickerResponse) => {
    if (result.errorMessage) {
      // TODO send to sentry or other tracking error platform
      // TODO show error
      // https://github.com/react-native-image-picker/react-native-image-picker#errorcode
      console.log(result.errorCode);
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
    const result = await launchImageLibrary(defaulPictureOptions);
    setUriPhoto(result);
  };

  const onNext = async () => {
    dispatch(finishSignUpUser(navigation));
  };

  return (
    <MainContainer>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Seleciona una foto de perfil</Text>
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
                {picture.uri !== '' ? 'Modificar' : 'Agregar'}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          {picture.uri !== '' && <Button title="siguiente" onPress={onNext} />}
          <View style={styles.omitButton}>
            <Button type="outline" title="omitir" onPress={onNext} />
          </View>
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
              <Text style={styles.actionSheetText}>Tomar Fotografia</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.background}
            style={styles.actionSheetTouch}
            onPress={onChooseImage}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="photo" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>
                Seleccionar de mi galeria
              </Text>
            </View>
          </TouchableHighlight>
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
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
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
    left: (Metrics.screenWidth / 2 - 85) / 2,
    width: 85,
    textShadowColor: Colors.paragraph,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5,
  },
  touchPicture: {
    position: 'relative',
    width: Metrics.screenWidth / 2,
    height: Metrics.screenWidth / 2,
    borderRadius: Metrics.screenWidth / 4,
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
