import React, {useLayoutEffect} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import { Button } from '../../components';
import MedicineCard from '../../components/MedicineCard';
import { MainContainer } from '../../components/Layout';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { findMonitors } from '../../thunks/blood-pressure/monitors-thunk';
import { selectMonitors } from '../../store/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Aspirina 1',
    hour:"6:00 pm",
    brand: "hello",
    model: "helloModel",
    use:"helloValue",
    measurementSite:"helloMeasure",
    measurementMethod: "hellomeasurementMethod",
    validationStudy:"hellovalidationStudy",
    dosis: "25mg"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Aspirina 2',
    hour:"6:00 pm",
    brand: "hello",
    model: "helloModel",
    use:"helloValue",
    measurementSite:"helloMeasure",
    measurementMethod: "hellomeasurementMethod",
    validationStudy:"hellovalidationStudy",
    dosis: "50mg"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Aspirina 3',
    hour:"6:00 pm",
    brand: "hello",
    model: "helloModel",
    use:"helloValue",
    measurementSite:"helloMeasure",
    measurementMethod: "hellomeasurementMethod",
    validationStudy:"hellovalidationStudy",
    dosis: "75mg"
  },
];

const MedicineScreen: React.FC<Props> = ({ navigation }) => {

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
    <View style={[styles.mainContainer, styles.content]}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <MedicineCard {...item} />}
        keyExtractor={item => item.id}
      />
        <View style={styles.footer}>
          <Button 
            title="Agregar Medicina" 
            onPress={() => {
              navigation.navigate('Medicine');
            }}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  content:{
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header:{
    fontSize:30,
    padding:2,
    backgroundColor:"#f0f000",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  item: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:10, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding:2
  },
  hour: {
    fontSize: 20,
    padding:2
  },
  footer: {
    marginTop: 18,
    marginBottom: 12,
    padding:4
  },
});

export default MedicineScreen;
