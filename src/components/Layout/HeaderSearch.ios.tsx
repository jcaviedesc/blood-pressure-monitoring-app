import React from 'react';
import { StyleSheet, Text, View, useColorScheme, TouchableOpacity } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Metrics } from '../../styles';
import Input from '../Input';

export const HeaderSearch = ({
  navigation,
  options,
}: NativeStackHeaderProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const headerHeight = useHeaderHeight();
  const { headerSearchBarOptions } = options;
  const searchIcon = (
    <View style={styles.icon}>
      <Icon
        name="search"
        size={18}
        color={isDarkMode ? Colors.background : Colors.darkGrayMode}
      />
    </View>
  );
  return (
    <View
      style={[
        styles.headerContainer,
        options.headerStyle,
        { height: headerHeight + 9 },
      ]}>
      <View style={{ flex: 1 }}>
        <Input
          placeholder={headerSearchBarOptions?.placeholder}
          clearButtonMode="unless-editing"
          leftComponent={searchIcon}
          onChangeText={headerSearchBarOptions?.onChangeText}
        />
      </View>
      <TouchableOpacity
        style={styles.cancelTextContainer}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text
          style={[
            styles.cancelText,
            { color: isDarkMode ? Colors.background : Colors.paragraph },
          ]}>
          {headerSearchBarOptions?.cancelButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: Metrics.navBarHeight + 9,
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },
  cancelTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 9,
  },
  cancelText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
  },
});
