import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Colors, Images } from '../../styles';

type props = {
  avatarUri: string;
  sex: 'M' | 'F' | string;
  size?: number;
};

const buildStyles = (size = 50) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
});

const Avatar: React.FC<props> = ({ avatarUri, sex, size }) => {
  let source = sex === 'M' ? Images.menGenderAvatar : Images.womenGenderAvatar;
  if (avatarUri) {
    source = {
      uri: avatarUri,
    };
  }
  return (
    <Image
      source={source}
      defaultSource={Images.userPlaceholder}
      style={[styles.avatar, buildStyles(size)]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
});

export default Avatar;
