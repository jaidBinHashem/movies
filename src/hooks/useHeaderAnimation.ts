import { Platform } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type UseHeaderAnimationReturn = {
  headerHeight: SharedValue<number>;
  headerAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  onScroll: (args: any) => void;
  setHeaderHeightFromJS: (h: number) => void;
  freezeDuring: (flag: boolean) => void;
};

export function useHeaderAnimation(
  defaultHeight = Platform.select({ ios: 88, android: 64 }) || 80,
): UseHeaderAnimationReturn {
  const headerHeight = useSharedValue<number>(defaultHeight);
  const prevY = useSharedValue(0);
  const offset = useSharedValue(0);
  const freeze = useSharedValue(false);

  const setHeaderHeightFromJS = (h: number) => {
    headerHeight.value = h;
    offset.value = Math.min(Math.max(offset.value, 0), h);
  };

  const freezeDuring = (flag: boolean) => {
    freeze.value = flag;
  };

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: e => {
      if (freeze.value) {
        prevY.value = Math.max(0, e.contentOffset.y);
        return;
      }
      prevY.value = Math.max(0, e.contentOffset.y);
    },
    onScroll: e => {
      if (freeze.value) return;
      const y = Math.max(0, e.contentOffset.y);
      const dy = y - prevY.value;
      prevY.value = y;

      const next = offset.value + dy;
      offset.value = Math.min(Math.max(next, 0), headerHeight.value || 0);

      if (y <= 0 && headerHeight.value > 0) {
        offset.value = 0;
      }
    },
    onEndDrag: () => {
      if (freeze.value) return;
      if (!headerHeight.value) return;
      const midpoint = headerHeight.value / 2;
      offset.value = withTiming(
        offset.value > midpoint ? headerHeight.value : 0,
        { duration: 160 },
      );
    },
    onMomentumEnd: () => {
      if (freeze.value) return;
      if (!headerHeight.value) return;
      const midpoint = headerHeight.value / 2;
      offset.value = withTiming(
        offset.value > midpoint ? headerHeight.value : 0,
        { duration: 160 },
      );
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offset.value }],
  }));

  return {
    headerHeight,
    headerAnimatedStyle,
    onScroll,
    setHeaderHeightFromJS,
    freezeDuring,
  };
}
