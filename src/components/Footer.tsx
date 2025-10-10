import React, { FC, memo } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../const/colors';

interface FooterProps {
  loading: boolean;
  hasMore: boolean;
  numberOfMovies: number;
}

const Footer: FC<FooterProps> = memo(({ loading, hasMore, numberOfMovies }) => {
  if (!loading && !hasMore && numberOfMovies > 0) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>No more movies to load</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.footerText}>Loading more movies...</Text>
      </View>
    );
  }

  return null;
});

Footer.displayName = 'Footer';

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default Footer;
