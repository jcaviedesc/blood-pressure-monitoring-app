import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

type Props = {
  onCompleteCode: (code: string) => void;
};
const VerifyCode: React.FC<Props> = ({ onCompleteCode }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? Colors.darkGrayMode : Colors.lightGray;
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const onChange = (currentSlot: number) => (digit: string) => {
    if (digit.length === 6) {
      setCode(digit.split(''));
      inputRefs.current[5]?.focus();
      onCompleteCode(digit);
    } else if (digit.length <= 1 && currentSlot <= 5) {
      const factor = digit === '' ? -1 : 1;
      const nextFocus =
        (currentSlot === 0 && digit === '') ||
        (currentSlot === 5 && digit !== '')
          ? currentSlot
          : currentSlot + 1 * factor;
      inputRefs.current[nextFocus]?.focus();
      let newCode = [...code];
      newCode[currentSlot] = digit;
      console.log(newCode);
      setCode(newCode);
      if (newCode.join('').length === 6) {
        onCompleteCode(newCode.join(''));
      }
    }
  };

  return (
    <View style={styles.contaier}>
      {[...Array(6).keys()].map(inputKey => {
        return (
          <View style={styles.inputContainer} key={`Code-${inputKey}`}>
            <TextInput
              ref={refInput => (inputRefs.current[inputKey] = refInput)}
              maxLength={inputKey === 0 ? 6 : 1}
              keyboardType="phone-pad"
              style={[styles.input, { backgroundColor }]}
              onChangeText={onChange(inputKey)}
              value={code[inputKey]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  contaier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginBottom: 36,
  },
  inputContainer: {
    borderColor: Colors.lightGray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.lightGray,
    height: (Metrics.screenWidth - 30) / 6,
    width: (Metrics.screenWidth - 70) / 6,
    overflow: 'hidden',
  },
  input: {
    padding: 6,
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default VerifyCode;
