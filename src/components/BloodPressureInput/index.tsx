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
  magnitude: string;
  variableName: string;
  autoFocus?: boolean;
  refInput?: React.LegacyRef<TextInput>;
  keyboardType?: TextInputProps['keyboardType'];
  showSoftInputOnFocus: TextInputProps['showSoftInputOnFocus'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  onChangeText?: TextInputProps['onChangeText'];
  value: string;
  onFocus?: TextInputProps['onFocus'];
};

const BloodPressureInput: React.FC<Props> = ({
  variableName,
  magnitude,
  autoFocus = false,
  refInput,
  onSubmitEditing,
  onChangeText,
  keyboardType = 'numeric',
  showSoftInputOnFocus = true,
  value,
  onFocus,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={refInput}
        autoFocus={autoFocus}
        style={styles.input}
        numberOfLines={1}
        keyboardType={keyboardType}
        showSoftInputOnFocus={showSoftInputOnFocus}
        maxLength={3}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
      />
      <View style={styles.textContainer}>
        <Text style={styles.varText}>{variableName}</Text>
        <Text style={styles.magnitudeText}>{magnitude}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.background,
  },
  input: {
    width: '55%',
    fontFamily: Fonts.type.lcd,
    letterSpacing: 12,
    textAlign: 'right',
    fontSize: 48,
    lineHeight: 48,
    backgroundColor: Colors.lightGray,
  },
  textContainer: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 21,
  },
  varText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
    height: 40,
  },
  magnitudeText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    textAlign: 'left',
    lineHeight: Fonts.size.h5,
  },
});

export default BloodPressureInput;
