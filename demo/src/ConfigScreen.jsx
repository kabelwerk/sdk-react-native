import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ConfigScreen = function (props) {
  // the form field values
  const [name, setName] = React.useState(props.name);
  const [token, setToken] = React.useState(props.token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fieldset}>
        <Text>The user's name</Text>
        <TextInput value={name} placeholder="Name" onChangeText={setName} />
      </View>

      <View style={styles.fieldset}>
        <Text>The JWT token to connect with</Text>
        <TextInput value={token} placeholder="Token" onChangeText={setToken} />
      </View>

      <Button title="Connect" onPress={props.generateUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  fieldset: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 20,
  },
});

export { ConfigScreen };
