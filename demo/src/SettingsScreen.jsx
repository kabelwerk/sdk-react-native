import { KabelwerkStatusBar } from 'kabelwerk-react-native';
import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const SettingsScreen = function (props) {
  // the form field value
  const [name, setName] = React.useState(props.name);

  // update the user's name and navigate back to the home screen
  const handleSubmit = function () {
    props
      .updateName(name)
      .then(() => {
        props.navigation.navigate('home');
      })
      .catch((error) => {
        Alert.alert('Updating the user name failed', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KabelwerkStatusBar />

      <View style={styles.fields}>
        <View style={styles.fieldset}>
          <Text style={styles.label}>Name of the user</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Name"
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <Button title="Update" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fields: {
    flex: 1,
  },
  fieldset: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
  },
  buttons: {
    alignItems: 'center',
    margin: 32,
  },
});

export { SettingsScreen };
