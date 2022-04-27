import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextStyle,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { SwiperUnit } from './components/SwiperUnit';
import { SideEmpty } from './components/SideEmpty';

type Props = {
  title: string;
  titleStyles: TextStyle;
  range: [number, number];
  unitStyles: TextStyle;
  activeUnitStyles: TextStyle;
  magnitudeSyles: TextStyle;
  onActiveItem?: (item: number) => void;
  initialUnitIndex?: number;
};
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 63;
const DELTA_X = 20.5;
const EMPTY_SPACE = SCREEN_WIDTH / 2 - ITEM_WIDTH / 2;

const SwiperUnits: React.FC<Props> = ({
  title,
  titleStyles,
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
    const offset = index === 0 ? EMPTY_SPACE + 3 : ITEM_WIDTH * index;

    return {
      length: ITEM_WIDTH,
      offset,
      index,
    };
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x + EMPTY_SPACE + DELTA_X;
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
    <View>
      <View style={styles.titleContainer}>
        <Text style={titleStyles}>{title}</Text>
      </View>
      <View style={styles.swiperContainer}>
        <FlatList
          ListHeaderComponent={<SideEmpty width={EMPTY_SPACE + 3} />}
          ListFooterComponent={<SideEmpty width={EMPTY_SPACE - 4} />}
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
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
        />
      </View>
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
  titleContainer: {
    marginHorizontal: 20,
    marginBottom: 9,
  },
  swiperContainer: {
    height: 90,
    position: 'relative',
  },
  lineIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: SCREEN_WIDTH / 2,
    width: 60,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // backgroundColor: 'rgba(6,6,6, 0.4)',
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
