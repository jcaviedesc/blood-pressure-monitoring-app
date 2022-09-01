import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MedicineCard from '../../components/MedicineCard';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { selectMonitors } from '../../store/blood-pressure';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Colors } from '../../styles';
import { fetchListMedicine } from '../../thunks/medicine/medicine-thunks';
import { selectMedicineUp } from '../../store/medicineup/medicineupSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'development'>;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Aspirina 1',
    hour:"6:00 pm",
    dosis: "25mg",
    apparience: "pildora"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Aspirina 2',
    hour:"6:00 pm",
    dosis: "50mg",
    apparience: "mi"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Aspirina 3',
    hour:"6:00 pm",
    dosis: "75mg",
    apparience: "gotas"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d47',
    title: 'Aspirina 4',
    hour:"6:00 pm",
    dosis: "75mg",
    apparience: "inhaladores"
  },
];

const MedicineScreen: React.FC<Props> = ({ navigation }) => {

  const { translate } = useI18nLocate();

  const dispatch = useAppDispatch();
  const {listMedicine} = useAppSelector(selectMedicineUp);

   useEffect(() => {
    dispatch(fetchListMedicine());
   }, []) 
   

  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle}>
         {translate('medicine_info_screen.not_found_medicine')}
      </Text>
    );
  };


  return (
    <View style={[styles.mainContainer, styles.content]}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
        data={listMedicine}
        renderItem={({ item }) => <MedicineCard {...item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyListMessage}
      />
        <View style={styles.footer}>
            <Entypo
              name="circle-with-plus"
              size={80}
              color={Colors.tertiary}
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
    padding:8,
    flexDirection: "row-reverse"
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: Colors.tertiaryTranslucent
  },
});

export default MedicineScreen;
