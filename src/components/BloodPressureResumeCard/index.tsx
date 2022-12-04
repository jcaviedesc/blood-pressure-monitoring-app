import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts } from '../../styles';
import Card from '../Card';
import { Text } from '../CustomText';
import Tag from '../Tag';
import { BloodPressureMeasurement } from '../../schemas/blood-pressure';
import Dayjs from '../../services/DatetimeUtil';
import { useI18nLocate } from '../../providers/LocalizationProvider';

type props = {
  title: string;
  measurements: BloodPressureMeasurement[];
};

const BloodPressureResumeCard: React.FC<props> = ({ title, measurements }) => {
  const LastIndexRecord = measurements.length - 1;
  const { translate } = useI18nLocate();
  return (
    <Card>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {measurements.map((measurement, index) => (
        <View
          style={styles.resumeRow}
          key={`${Dayjs(measurement.t).format('hh:mm a')}${index}`}>
          <View style={styles.resumeRowTime}>
            {index !== 0 && (
              <View style={[styles.timeLine, styles.upperTimeLine]} />
            )}
            <View style={styles.tagContainer}>
              <Tag value={Dayjs(measurement.t).format('hh:mm a')} />
            </View>
            {index !== LastIndexRecord && (
              <View style={{ flex: 1 }}>
                <View style={styles.timeLine} />
              </View>
            )}
          </View>

          <View style={styles.resumeRowBody}>
            <View style={styles.resumeRowBodyBP}>
              <View>
                <View>
                  <Text style={styles.value}>
                    {measurement.sys}
                    <Text style={[styles.value, styles.magnitude]}>
                      {' mmHg'}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.text}>{translate('systolic')}</Text>
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.value}>
                    {measurement.dia}
                    <Text style={[styles.value, styles.magnitude]}>
                      {' mmHg'}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text style={styles.text}>{translate('diastolic')}</Text>
                </View>
              </View>
            </View>

            <View>
              {measurement.bpm !== 0 && (
                <View style={styles.heartRateContainer}>
                  <Text style={[styles.text, styles.bpmText]}>
                    {`${measurement.bpm} bpm`}
                  </Text>
                  <Icon
                    name={true ? 'heart' : 'heart-o'}
                    size={16}
                    color={Colors.tertiary}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.type.bold,
    color: Colors.headline,
    fontSize: Fonts.size.h5,
  },
  titleContainer: {
    marginBottom: 18,
    marginLeft: 9,
  },
  resumeRow: {
    flexDirection: 'row',
  },
  value: {
    fontFamily: Fonts.type.semiBold,
    color: Colors.headline,
    fontSize: Fonts.size.h4,
  },
  magnitude: {
    paddingLeft: 93,
    fontSize: Fonts.size.paragraph,
    fontFamily: Fonts.type.light,
  },
  resumeRowBody: {
    flex: 70,
    paddingBottom: 16,
  },
  resumeRowBodyBP: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resumeRowTime: {
    // flex: 30,
    width: 80,
    paddingTop: 12,
  },
  text: {
    fontSize: Fonts.size.paragraph,
    fontFamily: Fonts.type.regular,
    color: Colors.paragraph,
  },
  timeLine: {
    zIndex: 0,
    position: 'absolute',
    height: '100%',
    width: 2,
    left: '50%',
    backgroundColor: Colors.tertiary,
  },
  upperTimeLine: {
    height: 13,
    top: -1,
    backgroundColor: Colors.orange,
  },
  tagContainer: {
    zIndex: 2,
  },
  heartRateContainer: {
    flexDirection: 'row',
    marginLeft: 18,
    marginTop: 3,
    alignItems: 'center',
  },
  bpmText: {
    marginRight: 9,
  },
});

export default BloodPressureResumeCard;
