import { Platform } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { useMoviesData } from './useMoviesData';
import { SPACING, ANIMATION, LAYOUT } from '../const';

type UseHeaderAnimationReturn = {
  headerHeight: SharedValue<number>;
  headerHeightJS: number;
  headerAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  onScroll: (args: any) => void;
  setHeaderHeightFromJS: (h: number) => void;
};

export function useHeaderAnimation(
  defaultHeight = Platform.select({ ios: SPACING.headerHeightIOS, android: SPACING.headerHeightAndroid }) || SPACING.headerHeight,
): UseHeaderAnimationReturn {
  const { loadingMore } = useMoviesData();
  const headerHeight = useSharedValue<number>(defaultHeight);
  const [headerHeightJS, setHeaderHeightJS] = useState<number>(defaultHeight);
  const prevY = useSharedValue(0);
  const offset = useSharedValue(0);
  const freeze = useSharedValue(false);

  const setHeaderHeightFromJS = useCallback((h: number) => {
    headerHeight.value = h;
    setHeaderHeightJS(h);
    offset.value = Math.min(Math.max(offset.value, 0), h);
  }, [headerHeight, offset]);

  const freezeDuring = useCallback((flag: boolean) => {
    freeze.value = flag;
  }, [freeze]);

  // Handle header freezing during loading more movies
  useEffect(() => {
    freezeDuring(!!loadingMore);
    if (loadingMore) {
      setHeaderHeightFromJS(headerHeightJS);
    }
  }, [loadingMore, headerHeightJS, freezeDuring, setHeaderHeightFromJS]);

  const snapHeaderToPosition = () => {
    'worklet';
    if (freeze.value || !headerHeight.value) return;
    
    const midpoint = headerHeight.value / LAYOUT.scrollDivider;
    const targetOffset = offset.value > midpoint ? headerHeight.value : 0;
    
    offset.value = withTiming(targetOffset, { duration: ANIMATION.normal });
  };

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: e => {
      const clampedY = Math.max(LAYOUT.zeroOffset, e.contentOffset.y);
      prevY.value = clampedY;
    },
    onScroll: e => {
      if (freeze.value) return;
      
      const y = Math.max(LAYOUT.zeroOffset, e.contentOffset.y);
      const dy = y - prevY.value;
      prevY.value = y;

      const next = offset.value + dy;
      offset.value = Math.min(Math.max(next, LAYOUT.zeroOffset), headerHeight.value || LAYOUT.zeroOffset);

      // Reset offset when scrolled to top
      if (y <= LAYOUT.zeroOffset && headerHeight.value > LAYOUT.zeroOffset) {
        offset.value = LAYOUT.zeroOffset;
      }
    },
    onEndDrag: () => {
      snapHeaderToPosition();
    },
    onMomentumEnd: () => {
      snapHeaderToPosition();
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offset.value }],
  }));

  return {
    headerHeight,
    headerHeightJS,
    headerAnimatedStyle,
    onScroll,
    setHeaderHeightFromJS,
  };
}
