import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { Colors, Metrics } from '../../styles';
import Input from '../Input';

export const HeaderSearch = ({
  navigation,
  options,
  back,
}: NativeStackHeaderProps) => {
  const { headerSearchBarOptions } = options;
  return (
    <View style={[styles.headerContainer, options.headerStyle]}>
      <View style={styles.backButtonContainer}>
        {back && (
          <HeaderBackButton
            onPress={navigation.goBack}
            tintColor={Colors.stroke}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Input
          placeholder={headerSearchBarOptions?.placeholder}
          clearButtonMode="unless-editing"
          onChangeText={headerSearchBarOptions?.onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    paddingRight: 20,
    marginTop: Metrics.navBarHeight,
  },
  backButtonContainer: {
    height: 52,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
