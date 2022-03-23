import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Fonts, Colors } from '../../styles';

type Props = {
  title: string;
  refInput?: React.LegacyRef<TextInput>;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  onEndEditing?: TextInputProps['onEndEditing'];
  autoFocus?: TextInputProps['autoFocus'];
  onChangeText?: TextInputProps['onChangeText'];
};

const TextAreaInput: React.FC<Props> = ({
  title,
  refInput,
  onSubmitEditing,
  onEndEditing,
  autoFocus,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={refInput}
          multiline
          style={styles.textArea}
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
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
    backgroundColor: Colors.lightGray,
    height: 76,
    borderRadius: 5,
  },
  textArea: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
  },
});

export default TextAreaInput;
