import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../styles";

type Props = {
  onCompleteCode: (code: string) => void;
};
const VerifyCode: React.FC<Props> = ({ onCompleteCode }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  useEffect(() => {
    if (code.every(c => c !== '')) {
      onCompleteCode(code.join(''));
    }
  }, [code, onCompleteCode]);

  const codeRef = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const onChange = (nextRef: number) => {
    if (nextRef < 5) {
      codeRef[nextRef].current?.focus();
    }
  };

  const onSetCode = (codeNum: string, codeSlot: number) => {
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
          maxLength={1}
          keyboardType="phone-pad"
          style={styles.input}
          onChangeText={text => {
            onChange(0);
            onSetCode(text, 0);
          }}
          autoFocus
        />
      </View>
      {codeRef.map((item, index) => {
        return (
          <View style={styles.inputContainer} key={`Code-${index}`}>
            <TextInput
              ref={item}
              maxLength={1}
              onChangeText={text => {
                onSetCode(text, index + 1);
                if (text.length) {
                  onChange(index + 1);
                }
              }}
              keyboardType="phone-pad"
              style={styles.input}
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
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default VerifyCode;
