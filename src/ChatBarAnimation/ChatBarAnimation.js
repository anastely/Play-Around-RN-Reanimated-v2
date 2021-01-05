import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withSequence,
  withDelay,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';

{
  /*
    * Colors:
        -Primary ~ #226CFE 
        -secondary ~ #5095FA
*/
}
const AddAttachmentButton = Animated.createAnimatedComponent(TouchableOpacity);
const barWidth = Dimensions.get('window').width - 40;
const ChatBarAnimation = () => {
  const rotateAnimationValuew = useSharedValue(0);
  const rotateBar = useSharedValue(0);
  const isAnimated = useSharedValue(false);

  const progressOpacity = useDerivedValue(() => {
    return isAnimated.value
      ? withTiming(0, {duration: 600, easing: Easing.in(Easing.ease)})
      : withTiming(1, {duration: 900, easing: Easing.in(Easing.ease)});
  });

  const rotateAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: -52},
        {translateY: -203},
        {rotateZ: `${rotateAnimationValuew.value}deg`},
        {translateX: 52},
        {translateY: 203 + 20},
      ],
    };
  });
  const rotateInput = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: -125},
        {translateY: -35},
        {rotateZ: `${rotateAnimationValuew.value}deg`},
        {translateX: 125 + 5},
        {translateY: 35},
      ],
    };
  });

  const hideAddStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progressOpacity.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  const hideCloseStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progressOpacity.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      // zIndex: isAnimated.value ? 9999 : -99999,
    };
  });

  const addAttachment = () => {
    isAnimated.value = true;
    rotateAnimationValuew.value = withDelay(
      100,
      isAnimated.value
        ? withTiming(0, {
            duration: 200,
            easing: Easing.in(Easing.ease),
          })
        : withTiming(-90, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          }),
    );
    rotateBar.value = isAnimated.value
      ? withTiming(
          -0.2,
          {duration: 200, easing: Easing.in(Easing.ease)},
          () => {
            rotateBar.value = withTiming(0, {
              duration: 50,
              easing: Easing.inOut(Easing.ease),
            });
          },
        )
      : withTiming(0.1, {duration: 200, easing: Easing.in(Easing.ease)}, () => {
          rotateBar.value = withTiming(0, {
            duration: 50,
            easing: Easing.inOut(Easing.ease),
          });
        });
  };

  const closeAttachment = () => {
    isAnimated.value = false;

    rotateAnimationValuew.value = withDelay(
      100,
      isAnimated.value
        ? withTiming(0, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          })
        : withTiming(-90, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          }),
    );

    rotateBar.value = isAnimated.value
      ? withTiming(
          -0.2,
          {duration: 200, easing: Easing.in(Easing.ease)},
          () => {
            rotateBar.value = withTiming(0, {
              duration: 50,
              easing: Easing.inOut(Easing.ease),
            });
          },
        )
      : withTiming(0.1, {duration: 200, easing: Easing.in(Easing.ease)}, () => {
          rotateBar.value = withTiming(0, {
            duration: 50,
            easing: Easing.inOut(Easing.ease),
          });
        });
  };

  const bouncing = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: -1 * (barWidth / 2)},
        {translateY: -40},
        {
          rotateZ: rotateBar.value,
        },
        {translateX: barWidth / 2},
        {translateY: 40},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.barContainer, bouncing]}>
        <AddAttachmentButton
          onPress={addAttachment}
          style={[styles.circle, hideAddStyle]}>
          <Text style={{fontSize: 40, color: '#fff', opacity: 0.7}}>+</Text>
        </AddAttachmentButton>

        <Animated.View style={[styles.mesgInputWrapper, rotateInput]}>
          <View style={styles.mesgInput}>
            <Text style={styles.msgText}>Message...</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.attachmentsElements, rotateAnimationStyle]}>
          <AddAttachmentButton
            onPress={closeAttachment}
            style={[styles.circle, hideCloseStyle]}>
            <Text
              style={[
                {fontSize: 40, color: '#fff', opacity: 0.7},
                styles.rotatedIcons,
              ]}>
              X
            </Text>
          </AddAttachmentButton>

          <View style={styles.circle}>
            <Text style={styles.rotatedIcons}>Camera</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.rotatedIcons}>video</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.rotatedIcons}>Contacts</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ChatBarAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  barContainer: {
    backgroundColor: '#226CFD',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    overflow: 'hidden',
    width: barWidth,
    height: 80,
  },
  mesgInputWrapper: {
    width: 250,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  mesgInput: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#5095FA',
    marginHorizontal: 20,
    borderRadius: 30,
  },
  msgText: {
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5095FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  attachmentsElements: {
    position: 'absolute',
    top: 49.5,
    left: 10,
    width: 100,
    height: 450,
  },
  rotatedIcons: {
    transform: [{rotate: '90deg'}],
  },
});
