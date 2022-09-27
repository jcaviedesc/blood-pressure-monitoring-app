
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Fonts, Metrics, Colors } from '../../styles';

const ICON_CHIP = {
  'pill':'pills',
  'solution':'prescription-bottle-alt',
  'injection': 'syringe',
  'dust': 'prescription-bottle',
  'drops': 'eye-dropper',
  'inhaler': 'lungs',
  'other': 'question-circle'
  }

const ICON_CHIP_DEFAULT = 'question-circle'

const MedicineCard: React.FC<any> = (props) => {
  //console.log('THIS IS DATA',props)
  const { translate } = useI18nLocate();
  return (
     <View style={styles.item}>
      <View style={styles.content}>
        <View style={styles.description}>
          <View style={styles.icon}>
            <FontAwesome5
              name={ICON_CHIP[props.apparience] || ICON_CHIP_DEFAULT}
              size={25}
              color={Colors.primary}
            />
          </View>
          <View style={styles.titleMedicine}>
            <Text style={styles.titleText}>{translate('medicineDose')}</Text>
            <Text style={styles.value}>{props.name}</Text>
          </View>
          <View style={styles.titleMedicine2}>
          <Text style={styles.titleText}>{translate('dose')}</Text>
            <Text style={styles.normarValue}>{props.dose.value+" "+props.dose.unit}</Text>
          </View>
        </View>
        <View style={styles.bodyHead}>
          <View style={styles.descriptionBody}>
            <Text style={styles.titleText}>{translate('frecuency')}</Text>
            <Text style={styles.normarValue}>{translate(props.frecuency)}</Text>
          </View>
          <View style={styles.descriptionBody}>
            <Text style={styles.normarValue}>{props.timesPerDay+" "}{props.timesPerDay === 1 ? translate('only') : translate('twice')}</Text>
          </View>
        </View>
        {props.frecuency !== 'every day' && 
          <View style={styles.descriptionBody}>
            <Text style={styles.titleText}>{translate('days medicine')}</Text>
            <Text style={styles.normarValue}>{props.days+' '}</Text>
          </View>}
        <View style={styles.bodyHead}>
          <View style={styles.descriptionBody}>
            <Text style={styles.titleText}>{translate('hourDose')}</Text>
            <Text style={styles.normarValue}>{props.times+'  '}</Text>
          </View>
        </View>
        
      </View>
      {/* <View style={styles.menudots}>
        <Icon
          name={true ? 'dots-three-vertical' : 'dots-three-vertical'}
          size={16}
          color={Colors.primary}
        />
      </View> */}
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrics.screenWidth,
  },
  image: {
    width: '100%',
    height: Metrics.screenWidth / 2,
  },
  content: {
    paddingHorizontal: 10,
  },
  menudots:{
    alignContent:'center',
    alignItems:'center',
    backgroundColor:"fff000"
  },
  titleMedicine:{
    width: 150,
    paddingHorizontal: 10,
    borderLeftColor: '#f0f0f0',
    borderLeftWidth: 3,
    paddingLeft: 8,
    marginLeft:6,
    paddingTop:2,
    
  },
  titleMedicine2:{
    paddingHorizontal: 10,
    borderLeftColor: '#f0f0f0',
    borderLeftWidth: 3,
    paddingLeft: 8,
    marginLeft:6,
    paddingTop:2,
    
  },
  titleText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
    paddingRight:4
  },
  value: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
    marginBottom: 9,
  },
  normarValue: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.headline,
  },
  bodyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    //flexWrap: "wrap",
    flexDirection: "row",
  },
  descriptionBody: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: 2,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  borderLeft:{
    borderLeftColor: '#f0f0f0',
    borderLeftWidth: 2,
    paddingLeft: 4,
    paddingTop:2
  },
  use: {
    flex: 50,
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
    fontSize: 18,
    fontWeight: "bold",
    padding:2
  },
  icon:{
    width:40,
    alignContent:'center',
    alignItems:'center',
    padding:2
  },
  hour: {
    borderLeftColor: '#f0f0f0',
    borderLeftWidth: 2,
    paddingLeft: 4,
    paddingTop:2
  },
});


export default MedicineCard;
