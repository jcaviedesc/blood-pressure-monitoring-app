import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import { Colors, Fonts } from '../../styles';
import Card from '../Card';
import { Text } from '../CustomText';
import LocalDayjs from '../../services/DatatimeUtil';

type boxPros = {
  title: string;
  status: string;
  value: string;
  unit: string;
  iconColor: string;
  lastMeasurement: string;
  onPress?: TouchableOpacityProps['onPress'];
  iconName: string;
};
const Box: React.FC<boxPros> = ({
  title,
  status,
  value,
  unit,
  iconColor,
  iconName,
  lastMeasurement,
  onPress,
}) => {
  const lastMeasurementTime = LocalDayjs(lastMeasurement).local();
  const timeFormat = LocalDayjs().local().isSame(lastMeasurement, 'day')
    ? 'h:m a'
    : 'D MMM';
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Card>
        <View style={styles.boxHead}>
          <View style={styles.boxHeadTitle}>
            <FontAwesomeIcon
              name={iconName}
              size={22}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={styles.boxTextTitle} ellipsizeMode="tail">{title}</Text>
          </View>
          <View style={styles.boxHeadTime}>
            {lastMeasurementTime.isValid() && (
              <Text style={styles.lastMeasurement}>
                {lastMeasurementTime.format(timeFormat)}
              </Text>
            )}
            <EntypoIcon
              name={
                Platform.OS === 'android'
                  ? 'chevron-right'
                  : 'chevron-small-right'
              }
              size={22}
              color={Colors.paragraph}
            />
          </View>
        </View>
        <View style={styles.boxBody}>
          {status === 'no data' && (
            <Text style={styles.noDataText}>{status}</Text>
          )}
          {/* <Text style={styles.boxText}>{status}</Text> */}
          {status !== 'no data' && (
            <View style={styles.valueContainer}>
              <View>
                <Text style={styles.valueText}>{value}</Text>
              </View>
              <Text style={styles.unitText}>{unit}</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 1,
    paddingVertical: 1,
    justifyContent: 'flex-end',
    marginBottom: 9,
    position: 'relative',
  },
  boxHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxHeadTitle: {
    flexDirection: 'row',
  },
  boxHeadTime: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 6,
  },
  boxContent: {
    flex: 1,
  },
  boxTitleContainer: {},
  boxTextTitle: {
    marginRight: 10,
    fontFamily: Fonts.type.bold,
    color: Colors.headline,
    fontSize: Fonts.size.paragraph,
    textAlign: 'left',
  },
  boxText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    lineHeight: 30,
  },
  valueText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    // lineHeight: 20,
    height: 33,
    // textAlignVertical: 'bottom',
    textAlignVertical: 'center',
    marginRight: 6,
    color: Colors.headline,
    includeFontPadding: false,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
  },
  unitText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  lastMeasurement: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
  },
  boxBody: {
    marginTop: 9,
    marginLeft: 6,
  },
  noDataText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    color: Colors.headline,
  },
});

export default Box;
