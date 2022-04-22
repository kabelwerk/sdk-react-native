import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ConfigContext } from './ConfigContext.jsx';

const HomeScreen = function () {
  const config = React.useContext(ConfigContext);

  const resetToken = function () {
    config.update({
      url: config.url,
      token: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Reset configuration" onPress={resetToken} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { HomeScreen };
