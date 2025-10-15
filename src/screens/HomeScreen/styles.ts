import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../const/colors';
import { SPACING, TYPOGRAPHY, SHADOW, LAYOUT } from '../../const';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: LAYOUT.overlay,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOpacity: SHADOW.opacity,
        shadowRadius: SHADOW.radius,
        shadowOffset: { width: 0, height: SHADOW.offset },
      },
      android: { elevation: SHADOW.elevation },
    }),
  },
  listContainer: { paddingBottom: SPACING.lg, marginTop: SPACING.xs },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.xxl,
  },
  emptyText: { fontSize: TYPOGRAPHY.body, color: COLORS.onSurface, textAlign: 'center' },
});
