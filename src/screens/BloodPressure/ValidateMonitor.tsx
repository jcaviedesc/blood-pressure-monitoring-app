import React, { useLayoutEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { MonitorCard } from '../../components';
import { MainContainer } from '../../components/Layout';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { findMonitors } from '../../thunks/blood-pressure/monitors-thunk';
import { selectMonitors } from '../../store/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'BloodPressure/ValidateMonitor'
>;

const ValidateMonitor: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const dispatch = useAppDispatch();
  const monitors = useAppSelector(selectMonitors);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        cancelButtonText: translate('headerSearch.cancel'),
        placeholder: translate('headerSearch.placeholder'),
        autoFocus: true,
        onChangeText: text => {
          dispatch(findMonitors(text));
        },
      },
    });
  }, [navigation, translate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainContainer>
        <FlatList
          data={monitors}
          keyExtractor={(item: object, index: number) =>
            `${item.model}-${index}`
          }
          renderItem={({ item }) => <MonitorCard {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 21 }} />}
        />
      </MainContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
});

export default ValidateMonitor;
