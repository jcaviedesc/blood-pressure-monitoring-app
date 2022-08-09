import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles, Colors, Fonts } from '../../styles';
import { MainContainer } from '../../components/Layout';
import {
  Button,
  Text,
  SearchSelfcareCard,
  DotsLoading,
} from '../../components';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProfileUser } from '../../store/user/userSlice';
import { userTypeEnum } from '../../store/user/types';
import { searchSelfcareTipThunk } from '../../thunks/selfcare/selfcare-thunk';
import { selectSearchSelfcare, clear } from '../../store/selfcare';
import { debounce } from 'lodash';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeTabs'>;

const SearchAcademicBlogPosts: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const user = useAppSelector(selectProfileUser);
  const { data: searchResult, loading } = useAppSelector(selectSearchSelfcare);
  const dispatch = useAppDispatch();
  const searchRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchText = useCallback(
    (text: string) => {
      // const { text } = event?.nativeEvent;
      if (text && text.length > 0) {
        dispatch(searchSelfcareTipThunk(text));
      }
    },
    [dispatch],
  );

  const onCancelSearch = () => {
    dispatch(clear());
  };

  useLayoutEffect(() => {
    searchRef.current = debounce(onSearchText, 500);
    const onSearch = event => {
      searchRef.current(event?.nativeEvent.text);
    };

    const headerRightComp =
      user.userType === userTypeEnum.HEALT_PROFESSIONAL &&
      Platform.OS === 'ios' ? (
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
      title: translate('TabsSearch.header.title'),
      headerSearchBarOptions: {
        placeholder: translate('TabsSearch.header.placeholder'),
        onChangeText: onSearch,
        cancelButtonText: translate('button.cancel'),
        obscureBackground: false,
        autoCapitalize: 'none',
        hideWhenScrolling: false,
        autoFocus: true,
        onCancelButtonPress: onCancelSearch,
      },
    };
    navigation.setOptions(options);
    return () => {
      console.log('cleann');
      navigation
        .getParent()
        ?.setOptions({ headerSearchBarOptions: null, headerShown: false });
    };
  }, [navigation, user]);

  return (
    <MainContainer
      isScrollView
      scrollViewProps={{
        contentInsetAdjustmentBehavior: 'automatic',
        keyboardDismissMode: 'on-drag',
      }}>
      <View style={styles.body}>
        {loading === 'pending' && (
          <DotsLoading loadingText={translate('TabsSearch.loading')} />
        )}
        {Array.isArray(searchResult) && searchResult.map(result => (
          <SearchSelfcareCard key={result.key} {...result} />
        ))}
      </View>
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
  body: {
    paddingTop: 46,
    flex: 1,
    paddingBottom: 20,
  },
});

export default SearchAcademicBlogPosts;
