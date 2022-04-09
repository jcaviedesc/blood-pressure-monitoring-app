import React, { useRef } from 'react';
import { FlatList, StyleSheet, TextStyle, View, Text } from 'react-native';
import { SwiperUnit } from './components/SwiperUnit';

type Props = {
  range: [number, number];
  unitStyles: TextStyle;
  magnitudeSyles: TextStyle;
};

const ITEM_HEIGHT = 63;

const SwiperUnits: React.FC<Props> = ({
  range,
  unitStyles,
  magnitudeSyles,
}) => {
  const units = useRef(
    Array.from({ length: range[1] - range[0] }, (v, i) => i + range[0]),
  ).current;

  const _renderItem = ({ item, index, separators }) => {
    // console.log(index, separators);
    return <SwiperUnit unit={item} styleUnit={unitStyles} />;
  };

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  };

  return (
    <View style={styles.swiperContainer}>
      <FlatList
        keyExtractor={item => `${item}`}
        data={units}
        renderItem={_renderItem}
        horizontal
        onViewableItemsChanged={onViewableItemsChanged}
        // onEndReached={(info) => { console.log(info) }}
        onEndReachedThreshold={algo => {console.log("onEndReachedThreshold",algo)}}
        // eslint-disable-next-line prettier/prettier
        getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
      />
      <View style={styles.lineIndicatorContainer}>
        <View style={styles.magnitudeContainer}>
          <Text style={magnitudeSyles}>kg</Text>
        </View>
        <View style={styles.lineIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: 90,
    position: 'relative',
  },
  lineIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: ITEM_HEIGHT * 3,
    width: 30,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lineIndicator: {
    width: 2,
    height: 30,
    backgroundColor: 'red',
  },
  magnitudeContainer: {
    marginBottom: 9,
  },
});

export default SwiperUnits;
