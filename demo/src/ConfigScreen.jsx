import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ConfigContext } from './ConfigContext.jsx';

const ConfigScreen = function () {
  const config = React.useContext(ConfigContext);

  // the form field values
  const [url, setUrl] = React.useState(config.url);
  const [token, setToken] = React.useState(config.token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fieldset}>
        <Text>The Kabelwerk WebSocket URL to connect to</Text>
        <TextInput value={url} placeholder="URL" onChangeText={setUrl} />
      </View>

      <View style={styles.fieldset}>
        <Text>The JWT token to connect with</Text>
        <TextInput value={token} placeholder="Token" onChangeText={setToken} />
      </View>

      <Button title="Connect" onPress={() => config.update({ url, token })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fieldset: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 20,
  },
});

export { ConfigScreen };
