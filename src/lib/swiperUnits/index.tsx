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
const MEDIUM_SREEN = 388;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH =
  SCREEN_WIDTH >= MEDIUM_SREEN ? SCREEN_WIDTH / 6 : SCREEN_WIDTH / 5;
const EMPTY_SPACE = ITEM_WIDTH * 2.5;

// TOODO revisar shouldComponentUpdate
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
      width={ITEM_WIDTH}
      active={activeItem === index}
    />
  );

  const _getItemLayout = (data, index) => {
    const offset = index === 0 ? EMPTY_SPACE : EMPTY_SPACE + ITEM_WIDTH * index;

    return {
      length: ITEM_WIDTH,
      offset,
      index,
    };
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset =
      event.nativeEvent.contentOffset.x + EMPTY_SPACE + ITEM_WIDTH / 2;
    const index = xOffset / ITEM_WIDTH;
    const roundIndex = Math.round(index - 3);
    if (roundIndex !== activeItem) {
      setActiveItem(roundIndex);
      onActiveItem && onActiveItem(units[roundIndex]);
    }
  };

  const handlerInitialScrollIndex = useCallback(() => {
    if (initialUnitIndex) {
      console.log(initialUnitIndex - range[0]);
      return initialUnitIndex - range[0] - 3;
    } else {
      return (units.length - 1) / 2;
    }
  }, [initialUnitIndex, range, units.length]);

  return (
    <View style={styles.swiperContainer}>
      <View style={styles.titleContainer}>
        <Text style={titleStyles}>{title}</Text>
      </View>
      <FlatList
        ListHeaderComponent={<SideEmpty width={EMPTY_SPACE} />}
        ListFooterComponent={<SideEmpty width={EMPTY_SPACE} />}
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
  },
  swiperContainer: {
    height: '100%',
    position: 'relative',
  },
  lineIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: ITEM_WIDTH * 3 - 5,
    width: 60,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  lineIndicator: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 30,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
  },
  magnitudeContainer: {
    left: -8,
  },
});

export default SwiperUnits;
