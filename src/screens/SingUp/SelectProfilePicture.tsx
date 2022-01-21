import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actions-sheet';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions
} from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { RouteName } from '../../router/routeNames';
import { AppStyles, Images, Metrics, Fonts, Colors } from '../../styles';
import { Button } from '../../components';

type photoUri = {
  uri: string | undefined;
};

type actionSheetRef = {
  setModalVisible: () => void;
  hide: () => void;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  RouteName.PROFILE_PICTURE
>;

const defaulPictureOptions: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  quality: 0.7,
};

const SelectProfilePictureScreen: React.FC<Props> = ({ navigation }) => {
  const actionSheetRef = useRef<actionSheetRef>();
  const [photoUri, setPhotoUri] = useState<photoUri>({ uri: '' });

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
      setPhotoUri({ uri: photo?.uri });
    }
  };

  const onLaunchCamera = async () => {
    actionSheetRef.current?.hide();
    const result = await launchCamera(defaulPictureOptions);
    setUriPhoto(result);
  };

  const onChooseImage = async () => {
    actionSheetRef.current?.hide();
    const result = await launchImageLibrary(defaulPictureOptions);
    setUriPhoto(result);
  };

  return (
    <View style={styles.mainContainer}>
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
                source={photoUri.uri ? photoUri : Images.userPlaceholder}
                style={styles.picture}
              />
              <Text
                style={{
                  ...styles.addPicture,
                  color: photoUri.uri
                    ? Colors.darkBackground
                    : Colors.buttonText,
                }}>
                {photoUri.uri ? 'Modificar' : 'Agregar'}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          <Button
            title="siguiente"
            onPress={() => {
              // navigate();
            }}
          />
          <View style={styles.omitButton}>
            <Button
              type="outline"
              title="omitir"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
        </View>
      </View>
      <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={styles.actionSheet}>
          <TouchableHighlight
            style={styles.actionSheetTouch}
            onPress={onLaunchCamera}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="camera" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>Tomar Fotografia</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
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
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
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
    borderColor: Colors.cardBackground,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionSheet: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  actionSheetTouch: {
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  actionSheetText: {
    marginLeft: 12,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.headline,
  },
  actionSheetTouchContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
