/**
 * Movies App
 * A React Native app that fetches and displays movies from TMDB api
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { AppErrorBoundary } from './src/providers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}

export default App;
