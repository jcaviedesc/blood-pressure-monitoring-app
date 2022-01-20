import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { VerifyCode } from "../../components";
import { AppStyles, Colors, Fonts, Metrics } from "../../styles";

const VerifyPhoneScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.content, styles.contentExtra]}>
        <Text style={styles.title}>
          Te enviamos un código para verificar tu numero de celuar
        </Text>
        <VerifyCode
          onCompleteCode={(code: string) => {
            console.log(code);
          }}
        />
        <Text style={styles.noCode}>¿No recibiste el código?</Text>
        <TouchableOpacity style={styles.resend}>
          <Text>Reenviar en: 00: 05</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  contentExtra: {
    paddingTop: Metrics.screenHeight / 10,
  },
  title: {
    ...Fonts.style.h4,
    textAlign: 'center',
    color: Colors.gray300,
    marginBottom: 21,
  },
  codeContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
  },
  noCode: {
    ...Fonts.style.normal,
    textAlign: 'center',
  },
  resend: {
    marginTop: 12,
    padding: 9,
    alignItems: 'center',
  },
});

export default VerifyPhoneScreen;
