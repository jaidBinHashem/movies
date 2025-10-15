import { StyleSheet } from 'react-native';
import { COLORS } from '../../const/colors';
import { SPACING, TYPOGRAPHY, SHADOW } from '../../const';

export const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    marginBottom: SPACING.md,
  },
  content: {
    padding: SPACING.md,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  poster: {
    width: SPACING.posterWidth,
    height: SPACING.posterHeight,
    borderRadius: SPACING.radius,
  },
  noPoster: {
    width: SPACING.posterWidth,
    height: SPACING.posterHeight,
    borderRadius: SPACING.radius,
    backgroundColor: COLORS.outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.onSurface,
  },
  detailsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.radius,
    padding: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: SHADOW.offsetMedium,
    },
    shadowOpacity: SHADOW.opacityMedium,
    shadowRadius: SHADOW.radiusMedium,
    elevation: SHADOW.elevationMedium,
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.onBackground,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  year: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: SPACING.borderWidth,
    borderBottomColor: COLORS.outline,
  },
  rating: {
    fontSize: TYPOGRAPHY.subtitle,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.fontWeight,
  },
  duration: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.onSurface,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.onBackground,
    marginBottom: SPACING.xs,
  },
  sectionContent: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.onSurface,
    lineHeight: TYPOGRAPHY.lineHeight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: TYPOGRAPHY.subtitle,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.radiusSmall,
  },
  backButtonText: {
    color: COLORS.onPrimary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.fontWeight,
  },
});
