import React, { useMemo } from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { SearchBarProps } from 'react-native-screens';
import { useI18nLocate } from '../providers/LocalizationProvider';
import { Colors, Fonts } from '../styles';
import { Button, Text } from '../components';

type RightAction = {
  onPress: () => void;
  text?: string;
};

interface UseHeaderBar extends NativeStackNavigationOptions {
  showRightButton: boolean;
  navigation: NativeStackNavigationProp<any>;
  onSearch: SearchBarProps['onChangeText'];
  placeholder: SearchBarProps['placeholder'];
  searchBarOptions?: SearchBarProps;
  rightAction?: RightAction;
}

export const useHeaderSearchBar = ({
  showRightButton,
  headerTitle,
  onSearch,
  navigation,
  placeholder,
  searchBarOptions,
  rightAction,
}: UseHeaderBar) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { translate } = useI18nLocate();

  const headerButton = useMemo(() => {
    return () => (
      <Button
        hierarchy="transparent"
        size="small"
        onPress={rightAction?.onPress}
        appearance={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.addText}>{translate('button.add')} </Text>
      </Button>
    );
  }, [translate, rightAction?.onPress]);

  useLayoutEffect(() => {
    const options = {
      headerRight: showRightButton ? headerButton : undefined,
      headerShown: true,
      headerTitle,
      headerLargeTitle: Platform.OS === 'ios',
      headerStyle: {
        backgroundColor: isDarkMode ? Colors.darkBackground : Colors.background,
      },
      headerSearchBarOptions: {
        ...searchBarOptions,
        placeholder,
        onChangeText: onSearch,
        cancelButtonText: translate('button.cancel'),
        obscureBackground: true,
        autoCapitalize: 'none' as SearchBarProps['autoCapitalize'],
        hideWhenScrolling: true,
      },
    };
    navigation.setOptions(options);
    return () => {
      //todo
    };
  }, [
    navigation,
    isDarkMode,
    translate,
    headerTitle,
    onSearch,
    placeholder,
    searchBarOptions,
    showRightButton,
    headerButton,
  ]);
};

const styles = StyleSheet.create({
  addText: {
    fontFamily: Fonts.type.regular,
    color: Colors.tertiary,
    fontSize: Fonts.size.paragraph,
    lineHeight: Fonts.size.paragraph + 2,
  },
});
