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

type Props = {
  title?: string;
  refInput?: React.LegacyRef<TextInput>;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  onEndEditing?: TextInputProps['onEndEditing'];
  autoFocus?: TextInputProps['autoFocus'];
  onChangeText?: TextInputProps['onChangeText'];
  placeholder: string;
};

const TextAreaInput: React.FC<Props> = ({
  title,
  refInput,
  onSubmitEditing,
  onEndEditing,
  autoFocus,
  onChangeText,
  placeholder,
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
          multiline
          style={[styles.textArea, isDarkMode && { color: Colors.textNormal }]}
          placeholderTextColor={
            isDarkMode ? Colors.textNormal : Colors.paragraph
          }
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          placeholder={placeholder}
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
