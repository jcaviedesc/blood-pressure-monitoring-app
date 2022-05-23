import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import SwiperUnits from '../../lib/swiperUnits';
import { AppStyles, Colors, Fonts, Images } from '../../styles';
import { updateUserField, selectUser } from '../../store/signup/signupSlice';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, HeightSlider, SelectGenderSexToggle } from '../../components';
import { MainContainer } from '../../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/BodyInfo'>;

const BodyInfoScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const { gender } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onUpdateField = (
    field: 'weight' | 'gender' | 'height',
    value: number | string,
  ) => {
    dispatch(updateUserField({ field, value }));
  };

  const nextStepHandler = () => {
    //TODO add validation
    navigation.navigate('Singup/SelectUserType');
  };

  return (
    <MainContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.bodyScreenContent}>
          <View style={{ flex: 10 }}>
            <SelectGenderSexToggle
              maleImage={Images.menGenderAvatar}
              femaleImage={Images.womenGenderAvatar}
              onSelect={genderSex => {
                onUpdateField('gender', genderSex);
              }}
            />
          </View>
          <View style={{ flex: 62 }}>
            <HeightSlider
              title={translate('height')}
              titleStyles={styles.titleWeight}
              max={200}
              labelUnit="cm"
              imageGenderSex={
                gender === 'male' ? Images.menGender : Images.womenGender
              }
              onValueChangeFinish={heigthVal => {
                onUpdateField('height', heigthVal);
              }}
            />
          </View>
          <View style={{ flex: 18 }}>
            <SwiperUnits
              title={translate('weight')}
              titleStyles={styles.titleWeight}
              range={[20, 129]} // TODO cambiar de acuerdo a escala
              unitStyles={styles.weightUnit}
              activeUnitStyles={styles.activeWeightUnit}
              magnitudeSyles={styles.magnitude}
              onActiveItem={activeItem => {
                onUpdateField('weight', activeItem);
              }}
            />
          </View>
          <View style={[styles.section, { flex: 8 }]}>
            <Button title={translate('button.next')} onPress={nextStepHandler} />
          </View>
        </View>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleWeight: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
  },
  weightUnit: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  activeWeightUnit: {
    color: Colors.headline,
  },
  magnitude: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    color: Colors.paragraph,
    textAlign: 'center',
  },
  bodyScreenContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default BodyInfoScreen;
