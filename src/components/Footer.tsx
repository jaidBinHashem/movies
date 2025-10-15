import React, { memo } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';
import { SPACING, TYPOGRAPHY } from '../const';
import { LOADING_MESSAGES, UI_TEXT } from '../const/strings';

interface FooterProps {
  loading: boolean;
  hasMore: boolean;
  numberOfMovies: number;
}

const Footer = memo(({ loading, hasMore, numberOfMovies }: FooterProps) => {
  if (!loading && !hasMore && numberOfMovies > 0) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>{UI_TEXT.NO_MORE_MOVIES}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.footerText}>{LOADING_MESSAGES.MORE_MOVIES}</Text>
      </View>
    );
  }

  return null;
});

Footer.displayName = 'Footer';

const styles = StyleSheet.create({
  footer: {
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.onSurface,
    textAlign: 'center',
  },
});

export default Footer;
