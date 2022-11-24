import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../router/types';
import { AppStyles } from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MedicineCard from '../../components/MedicineCard';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Colors } from '../../styles';
import { fetchListMedicine } from '../../thunks/medicine/medicine-thunks';
import { selectMedicineUp } from '../../store/medicineup/medicineupSlice';


type Props = NativeStackScreenProps<RootStackParamList, 'MedicineList'>;

const MedicineScreen: React.FC<Props> = ({ navigation }) => {

  const { translate } = useI18nLocate();

  const dispatch = useAppDispatch();
  const listMedicine = useAppSelector(selectMedicineUp);

  useEffect(() => {
    dispatch(fetchListMedicine());
  }, []);


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
      <View style={{ flex: 1, justifyContent: 'center', zIndex: 1 }}>
        <FlatList
          data={listMedicine.medicineUpSlice}
          renderItem={({ item }) => <MedicineCard {...item} />}
          //keyExtractor={item => item?.id}
          ListEmptyComponent={<EmptyListMessage />}
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
  content: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 30,
    padding: 2,
    backgroundColor: "#f0f000",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 2
  },
  hour: {
    fontSize: 20,
    padding: 2
  },
  footer: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: 10,
    bottom: 4,
    borderRadius: 80,
    elevation: 8
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: Colors.tertiaryTranslucent
  },
});

export default MedicineScreen;
