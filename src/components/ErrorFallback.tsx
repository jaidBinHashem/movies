import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../const/colors';
import { SPACING, TYPOGRAPHY, ANIMATION } from '../const';
import { UI_TEXT } from '../const/strings';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⚠️</Text>
        </View>
        
        <Text style={styles.title}>{UI_TEXT.ERROR_TITLE}</Text>
        <Text style={styles.message}>{UI_TEXT.ERROR_MESSAGE}</Text>
        
        <View style={styles.errorDetailsContainer}>
          <Text style={styles.errorDetailsTitle}>{UI_TEXT.ERROR_DETAILS_LABEL}</Text>
          <Text style={styles.errorDetails}>{error.message}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.retryButton}
          onPress={resetErrorBoundary}
          activeOpacity={ANIMATION.pressed}
        >
          <Text style={styles.retryButtonText}>{UI_TEXT.TRY_AGAIN}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: TYPOGRAPHY.icon,
    textAlign: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.onBackground,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  message: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeightLarge,
    marginBottom: SPACING.xl,
  },
  errorDetailsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.radius,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    width: '100%',
    borderWidth: SPACING.borderWidth,
    borderColor: COLORS.outline,
  },
  errorDetailsTitle: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.fontWeight,
    color: COLORS.onBackground,
    marginBottom: SPACING.xs,
  },
  errorDetails: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.error,
    fontFamily: TYPOGRAPHY.fontMono,
    lineHeight: TYPOGRAPHY.lineHeight,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.radius,
    minWidth: 120,
  },
  retryButtonText: {
    color: COLORS.onPrimary,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.fontWeight,
    textAlign: 'center',
  },
});

export default ErrorFallback;
