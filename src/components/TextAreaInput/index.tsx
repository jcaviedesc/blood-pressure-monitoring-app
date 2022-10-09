import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  useColorScheme,
} from 'react-native';
import { Fonts, Colors } from '../../styles';

interface TextAreaInputProps extends TextInputProps {
  title?: string;
  refInput?: React.LegacyRef<TextInput>;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  title,
  refInput,
  ...options
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      {title !== undefined && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.darkGrayMode
              : Colors.lightGray,
          },
        ]}>
        <TextInput
          ref={refInput}
          {...options}
          multiline
          style={[styles.textArea, isDarkMode && { color: Colors.textNormal }]}
          placeholderTextColor={
            isDarkMode ? Colors.textNormal : Colors.paragraph
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18,
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
    color: Colors.paragraph,
  },
  inputContainer: {
    height: 75,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  textArea: {
    color: Colors.headline,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
  },
});

export default TextAreaInput;
