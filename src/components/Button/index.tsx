import React, { Children } from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../../styles';

type props = {
  children?: typeof Children;
  title?: string;
  onPress?: () => void;
  type?: 'fill' | 'outline';
  disabled?: boolean;
};

const Button: React.FC<props> = ({
  children,
  onPress,
  type = 'fill',
  title,
  disabled,
}) => {
  let buttonStyles = {
    ...styles.container,
    backgroundColor: type === 'fill' ? Colors.button : Colors.transparent,
  };
  if (disabled) {
    buttonStyles.backgroundColor = Colors.gray;
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      {children ? (
        children
      ) : (
        <Text
          style={{
            ...styles.title,
            color: type === 'fill' ? Colors.buttonText : Colors.button,
          }}>
          {title}
        </Text>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.button,
    borderWidth: 0.5,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
  },
});

export default Button;
