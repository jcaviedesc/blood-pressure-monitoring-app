import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

type Props = {
  onCompleteCode: (code: string) => void;
};
const VerifyCode: React.FC<Props> = ({ onCompleteCode }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (code.every(c => c !== '') && !complete) {
      onCompleteCode(code.join(''));
      setComplete(true);
    }
  }, [complete, code, onCompleteCode]);

  const codeRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const onChange = (text: string, currentSlot: number) => {
    if (text.length === 6) {
      setCode(text.split(''));
      codeRef[5].current?.focus();
    } else if (text.length <= 1 && currentSlot <= 5) {
      const factor = text === '' ? -1 : 1;
      const nextFocus =
        (currentSlot === 0 && text === '') || (currentSlot === 5 && text !== '')
          ? currentSlot
          : currentSlot + 1 * factor;
      changeDigit(text, currentSlot);
      codeRef[nextFocus].current?.focus();
    }
  };

  const changeDigit = (codeNum: string, codeSlot: number) => {
    setCode(prevCode => {
      const localCode = [...prevCode];
      localCode[codeSlot] = codeNum;
      return localCode;
    });
  };

  return (
    <View style={styles.contaier}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={codeRef[0]}
          maxLength={6}
          keyboardType="phone-pad"
          style={styles.input}
          onChangeText={text => {
            onChange(text, 0);
            // onSetCode(text, 0);
          }}
          autoFocus
          value={code[0]}
        />
      </View>
      {codeRef.slice(1).map((item, index) => {
        return (
          <View style={styles.inputContainer} key={`Code-${index}`}>
            <TextInput
              ref={item}
              maxLength={1}
              onChangeText={text => {
                // onSetCode(text, index + 1);
                onChange(text, index + 1);
              }}
              keyboardType="phone-pad"
              style={styles.input}
              value={code[index + 1]}
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
