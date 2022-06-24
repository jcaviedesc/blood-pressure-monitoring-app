import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Fonts } from '../../styles';
import Card from '../Card';
import { Text } from '../CustomText';
import Tag from '../Tag';
import { BloodPressureRecord } from '../../store/blood-pressure/types';
import Dayjs from '../../services/DatatimeUtil';

type props = {
  title: string;
  records: BloodPressureRecord[];
};

const BloodPressureResumeCard: React.FC<props> = ({ title, records }) => {
  const LastIndexRecord = records.length - 1;
  return (
    <Card>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {records.map((record, index) => (
        <View
          style={styles.resumeRow}
          key={Dayjs(record.datetime).format('hh:mm a')}>
          <View style={styles.resumeRowTime}>
            {index !== 0 && (
              <View style={[styles.timeLine, styles.upperTimeLine]} />
            )}
            <View style={styles.tagContainer}>
              <Tag value={Dayjs(record.datetime).format('hh:mm a')} />
            </View>
            {index !== LastIndexRecord && (
              <View style={{ flex: 1 }}>
                <View style={styles.timeLine} />
              </View>
            )}
          </View>

          <View style={styles.resumeRowBody}>
            <View>
              <View>
                <Text style={styles.value}>
                  {record.sys}
                  <Text style={[styles.value, styles.magnitude]}>
                    {' mmHg'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.text}>Sistolica</Text>
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.value}>
                  {record.dia}
                  <Text style={[styles.value, styles.magnitude]}>
                    {' mmHg'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.text}>Diastolica</Text>
              </View>
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
    marginBottom: 21,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 21,
  },
  resumeRowTime: {
    // flex: 30,
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
    height: 12,
  },
  tagContainer: {
    zIndex: 2,
  },
});

export default BloodPressureResumeCard;
