import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Svg} from 'react-native-svg';
import {
  Easing,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import AnimatedStroke from './AnimatedStroke';
import AnimatedBgStroke from './AnimatedBgStroke';

const MARGIN = 10;
const vWidth = 512 + MARGIN;
const vHeight = 512 + MARGIN;
const width = Dimensions.get('window').width - 64;
const height = (width * vHeight) / vWidth;
const paths = [
  'M497.937 282.602L480.869 258.352V0L462.936 3.586C396.001 16.973 342.091 60.53 316.627 121.076C315.816 121.061 315.007 121.039 314.194 121.039H197.757C196.944 121.039 196.135 121.061 195.324 121.076C169.86 60.53 115.95 16.973 49.016 3.586L31.082 0V258.405L14.058 282.608C1.687 299.96 -2.72 321.826 1.967 342.615C6.658 363.424 20.043 381.301 38.708 391.67L255.975 512L473.31 391.66C491.957 381.301 505.342 363.424 510.034 342.615C514.72 321.824 510.311 299.953 497.937 282.602ZM439.445 41.482L393.606 146.925C379.804 136.888 364.185 129.527 347.609 125.274C366.121 86.712 398.754 57.066 439.445 41.482ZM450.883 90.383V215.748L424.056 177.631L423.995 177.546C421.76 174.416 419.395 171.405 416.922 168.503L450.883 90.383ZM197.758 151.025H314.195C348 151.025 379.912 167.439 399.57 194.938L410.873 210.996H375.921C323.769 210.996 278.431 240.739 255.978 284.149C233.523 240.739 188.185 210.996 136.033 210.996H101.088L112.384 194.937C132.042 167.439 163.953 151.025 197.758 151.025ZM164.342 125.275C147.767 129.527 132.147 136.889 118.345 146.925L72.507 41.482C113.197 57.066 145.83 86.712 164.342 125.275ZM61.068 90.382L95.029 168.502C92.556 171.404 90.191 174.415 87.955 177.545L61.068 215.773V90.382ZM199.577 446.488L53.253 365.449C42.065 359.233 34.034 348.507 31.219 336.022C28.404 323.536 31.056 310.402 38.496 299.987L79.996 240.983H136.032C193.902 240.983 240.982 288.064 240.982 345.933V422.414C224.933 425.695 210.373 434.172 199.577 446.488ZM255.976 477.724L226.871 461.604C234.884 454.806 245.149 450.883 255.975 450.883C266.803 450.883 277.069 454.807 285.083 461.607L255.976 477.724ZM480.781 336.022C477.966 348.507 469.935 359.233 458.765 365.439L312.377 446.494C301.58 434.176 287.018 425.696 270.967 422.414V345.933C270.967 288.063 318.048 240.983 375.917 240.983H431.974L473.442 299.902L473.503 299.987C480.944 310.402 483.597 323.535 480.781 336.022Z',
  'M106.047 270.968V300.954C130.848 300.954 151.026 321.131 151.026 345.933H181.012C181.011 304.597 147.382 270.968 106.047 270.968Z',
  'M330.94 345.933H360.926C360.926 321.132 381.103 300.954 405.905 300.954V270.968C364.569 270.968 330.94 304.597 330.94 345.933Z',
];
const FoxLogo = () => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(
      500,
      withRepeat(
        withTiming(1, {duration: 4000, easing: Easing.inOut(Easing.ease)}),
        -1,
        true,
      ),
    );
  }, [progress]);
  return (
    <>
      <View style={styles.layer}>
        <Svg
          width={width}
          height={height}
          viewBox={`${-MARGIN / 2} ${-MARGIN / 2} ${vWidth + MARGIN / 2} ${
            vHeight + MARGIN / 2
          }`}>
          {paths.map((d, key) => (
            <AnimatedStroke d={d} progress={progress} key={key} />
          ))}
        </Svg>
      </View>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={[styles.layer, {opacity: 0.2}]}>
        <Svg
          width={width}
          height={height}
          viewBox={`${-MARGIN / 2} ${-MARGIN / 2} ${vWidth + MARGIN / 2} ${
            vHeight + MARGIN / 2
          }`}>
          {paths.map((d, key) => (
            <AnimatedBgStroke d={d} key={key} />
          ))}
        </Svg>
      </View>
    </>
  );
};

export default FoxLogo;
const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
