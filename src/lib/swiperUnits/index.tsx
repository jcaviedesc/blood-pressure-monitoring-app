import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextStyle,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SwiperUnit } from './components/SwiperUnit';
import { SideEmpty } from './components/SideEmpty';

type Props = {
  range: [number, number];
  unitStyles: TextStyle;
  activeUnitStyles: TextStyle;
  magnitudeSyles: TextStyle;
  onActiveItem?: (item: number) => void;
  initialUnitIndex?: number;
};

const ITEM_WIDTH = 63;
const DELTA_X = 20.5;
const DELTA_INDICATOR = 48;

const SwiperUnits: React.FC<Props> = ({
  range,
  unitStyles,
  activeUnitStyles,
  magnitudeSyles,
  onActiveItem,
  initialUnitIndex,
}) => {
  const units = useRef(
    Array.from({ length: range[1] - range[0] }, (v, i) => i + range[0]),
  ).current;

  const [activeItem, setActiveItem] = useState(0);

  const _renderItem = ({ item, index }) => (
    <SwiperUnit
      unit={item}
      styleActiveUnit={activeUnitStyles}
      styleUnit={unitStyles}
      active={activeItem === index}
    />
  );

  const _getItemLayout = (data, index) => {
    const offset =
      index === 0 ? ITEM_WIDTH * index + ITEM_WIDTH * 6 : ITEM_WIDTH * index;

    return {
      length: ITEM_WIDTH,
      offset,
      index,
    };
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset =
      event.nativeEvent.contentOffset.x + ITEM_WIDTH * 3 - DELTA_X;
    const index = xOffset / ITEM_WIDTH;
    const roundIndex = Math.round(index - 3);
    if (roundIndex !== activeItem) {
      setActiveItem(roundIndex);
      onActiveItem && onActiveItem(units[roundIndex]);
    }
  };

  const handlerInitialScrollIndex = useCallback(() => {
    if (initialUnitIndex) {
      return initialUnitIndex;
    } else {
      return (units.length - 1) / 2;
    }
  }, [units, initialUnitIndex]);

  return (
    <View style={styles.swiperContainer}>
      <FlatList
        ListHeaderComponent={<SideEmpty width={ITEM_WIDTH * 3} />}
        ListFooterComponent={
          <SideEmpty width={ITEM_WIDTH * 3 - DELTA_INDICATOR} />
        }
        keyExtractor={item => `${item}`}
        data={units}
        renderItem={_renderItem}
        horizontal
        // onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={_getItemLayout}
        initialScrollIndex={handlerInitialScrollIndex()}
        extraData={activeItem}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 90,
        }}
        onScroll={handleScroll}
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
    left: ITEM_WIDTH * 3,
    width: 60,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(6,6,6, 0.4)',
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
