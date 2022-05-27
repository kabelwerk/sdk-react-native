import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { KabelwerkProvider, KabelwerkRoomScreen } from 'kabelwerk-react-native';

import * as backend from './backend.js';
import * as storage from './storage.js';
import { HomeScreen } from './HomeScreen.jsx';
import { SettingsScreen } from './SettingsScreen.jsx';

// we do not really need react navigation for the demo, but we use it in order
// to test our KabelwerkRoomScreen component
const Stack = createNativeStackNavigator();

const App = function () {
  // whether the first loading from secure storage is done
  const [appIsReady, setAppIsReady] = React.useState(false);

  // the user's name
  const [name, setName] = React.useState('');

  // the Kabelwerk auth token
  const [token, setToken] = React.useState('');

  // set the name and token from the local storage
  const loadConfig = function () {
    return storage.load().then(({ name, token }) => {
      setName(name);
      setToken(token);
    });
  };

  // generate a new demo user
  const generateUser = React.useCallback(() => {
    return backend
      .generateUser()
      .then(({ key, name, token }) => {
        return storage.update({ name, token });
      })
      .then(() => {
        return loadConfig();
      });
  }, []);

  // update the user's name, also in the local storage
  const updateName = React.useCallback((newName) => {
    return storage.update({ name: newName, token }).then(() => {
      return loadConfig();
    });
  }, []);

  // reset the name and token, also in the local storage
  const logout = React.useCallback(() => {
    storage.reset().then(() => {
      return loadConfig();
    });
  }, []);

  // bootstrap the app
  React.useEffect(() => {
    loadConfig().finally(() => {
      setAppIsReady(true);
    });
  }, []);

  return (
    <NavigationContainer>
      {token ? (
        <KabelwerkProvider
          url={backend.WEBSOCKET_URL}
          token={token}
          logging="info"
        >
          <Stack.Navigator>
            <Stack.Screen name="home" options={{ title: 'Kabelwerk Demo' }}>
              {(props) => <HomeScreen {...props} logout={logout} />}
            </Stack.Screen>
            <Stack.Screen
              name="chat-room"
              component={KabelwerkRoomScreen}
              options={{ title: 'Kabelwerk Chat' }}
            />
            <Stack.Screen name="settings" options={{ title: 'Settings' }}>
              {(props) => (
                <SettingsScreen
                  {...props}
                  name={name}
                  updateName={updateName}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </KabelwerkProvider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="settings" options={{ title: 'Settings' }}>
            {(props) => (
              <SettingsScreen {...props} name={name} updateName={updateName} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// needed unless package.json's main is set to the default value generated by
// expo — node_modules/expo/AppEntry.js
registerRootComponent(App);

// exporting the root component makes expo refresh faster
export default App;
