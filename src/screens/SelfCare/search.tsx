import React, { useLayoutEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { MainContainer } from '../../components/Layout';
import { Button, Text } from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector } from '../../hooks';
import { selectProfileUser } from '../../store/user/userSlice';
import { userTypeEnum } from '../../store/user/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

const SearchAcademicBlogPosts: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const user = useAppSelector(selectProfileUser);

  useLayoutEffect(() => {
    const headerRightComp =
      user.userType === userTypeEnum.HEALT_PROFESSIONAL &&
      Platform.OS === 'ios' || true ? (
        <Button
          hierarchy="transparent"
          size="small"
          onPress={() => {
            navigation.navigate('AddSelfCareTip');
          }}
          apparence={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.addText}>{translate('button.add')}</Text>
        </Button>
      ) : null;

    const options = {
      headerRight: () => headerRightComp,
      headerShown: true,
      headerTitle: translate('TabsSearch.header.title'),
      headerSearchBarOptions: {
        placeholder: translate('TabsSearch.header.placeholder'),
        // cancelButtonText: translate('button.cancel'),
        onChangeText: (event) => {
          console.log(event.nativeEvent.text);
        },
        cancelButtonText: translate('button.cancel'),
        obscureBackground: false,
        autoCapitalize: 'none',
        hideWhenScrolling: false,
        autoFocus: true,
      },
    };
    navigation.setOptions(options);
    return () => {
      console.log('cleann');
      navigation
        .getParent()
        ?.setOptions({ headerSearchBarOptions: null, headerShown: false });
    };
  }, [navigation, translate, user]);

  return (
    <MainContainer
      isScrollView
      scrollViewProps={{
        contentInsetAdjustmentBehavior: 'automatic',
        keyboardDismissMode: 'on-drag',
      }}>
      <Text>SearchAcademicBlogPosts</Text>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  addText: {
    fontFamily: Fonts.type.regular,
    color: Colors.tertiary,
    fontSize: Fonts.size.paragraph,
    lineHeight: Fonts.size.paragraph + 2,
  },
});

export default SearchAcademicBlogPosts;
