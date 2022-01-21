import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from "react-native-actions-sheet";
import { AppStyles, Images, Metrics, Fonts, Colors } from '../../styles';

const SelectProfilePictureScreen = () => {
  const actionSheetRef = useRef();

  const onSelectPicture = () => {
    actionSheetRef.current?.setModalVisible();
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
              <Image source={Images.userPlaceholder} style={styles.picture} />
              <Text style={styles.addPicture}>Agregar</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <ActionSheet ref={actionSheetRef} bounceOnOpen>
        <View style={styles.actionSheet}>
          <TouchableHighlight style={styles.actionSheetTouch}>
            <View style={styles.actionSheetTouchContent}>
              <Icon name="camera" size={18} color={Colors.darkBackground} />
              <Text style={styles.actionSheetText}>Tomar Fotografia</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.actionSheetTouch}>
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
    resizeMode: 'contain',
  },
  pictureContainer: {
    alignItems: 'center',
  },
  addPicture: {
    position: 'absolute',
    bottom: 30,
    color: Colors.buttonText,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    left: (Metrics.screenWidth / 2 - 80) / 2,
    width: 80,
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
});

export default SelectProfilePictureScreen;
