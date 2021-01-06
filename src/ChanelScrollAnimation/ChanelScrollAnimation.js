/** Video By William Candillon:
 *  https://www.youtube.com/watch?v=ucpoqa2-74s */

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Data} from './Data';
import Item, {MAX_HEIGHT, MIN_HEIGHT} from './Item';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {clamp, snapPoint} from 'react-native-redash';

const ChanelScrollAnimation = () => {
  const snapPoints = Data.map((_, i) => i * -MAX_HEIGHT);
  console.log('snapPoints', snapPoints);
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y: value}}) => {
      y.value = value;
    },
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = y.value;
    },
    onActive: ({translationY}, ctx) => {
      y.value = clamp(ctx.y + translationY, -(Data.length - 1) * MAX_HEIGHT, 0);
    },
    onEnd: ({velocityY: velocity}) => {
      const destination = snapPoint(y.value, velocity, snapPoints);
      y.value = withSpring(destination, {velocity, overshootClamping: true});
    },
  });
  return (
    //  First Way
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={onScroll}
      style={styles.scrollView}
      contentContainerStyle={{
        height: (Data.length + 1) * MAX_HEIGHT,
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={MAX_HEIGHT}
      decelerationRate="fast">
      {Data.map((item, index) => (
        <Item y={y} index={index} item={item} key={index} />
      ))}
    </Animated.ScrollView>

    // Second Way
    // <PanGestureHandler onGestureEvent={onGestureEvent}>
    //   <Animated.View style={styles.scrollView}>
    //     {Data.map((item, index) => (
    //       <Item y={y} index={index} item={item} key={index} />
    //     ))}
    //   </Animated.View>
    // </PanGestureHandler>
  );
};

export default ChanelScrollAnimation;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#000',
  },
});
