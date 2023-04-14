import { registerRootComponent } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  KabelwerkInbox,
  KabelwerkMessageForm,
  KabelwerkProvider,
  KabelwerkRoomScreen,
} from 'kabelwerk-react-native';

import * as backend from './backend.js';
import * as storage from './storage.js';
import { HomeScreen } from './HomeScreen.jsx';
import { NoTokenScreen } from './NoTokenScreen.jsx';

// we do not really need react navigation for the demo, but we use it in order
// to test our KabelwerkRoomScreen component
const Stack = createNativeStackNavigator();

const App = function () {
  // needed for handling tapping on notifications
  const navigationRef = React.useRef();

  // the user's name
  const [name, setName] = React.useState('');

  // the Kabelwerk auth token
  const [token, setToken] = React.useState('');

  // set the name and token from the local storage
  const loadConfig = function () {
    return storage.load().then(({ name, token }) => {
      setName(name);
      setToken(token);
      return { name, token };
    });
  };

  // generate a new demo user
  const generateUser = React.useCallback(() => {
    return backend
      .generateUser()
      .then(storage.update)
      .then(loadConfig)
      .catch((error) => {
        Alert.alert('Error generating a user', error.message);
      });
  }, []);

  // reset the name and token, also in the local storage
  const logout = React.useCallback(() => {
    storage.reset().then(loadConfig);
  }, []);

  // bootstrap the app
  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then(loadConfig)
      .then(({ token }) => {
        if (!token) {
          return generateUser();
        }
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
  }, []);

  // schedule a local notification showing incoming chat message
  const triggerNotification = React.useCallback((message) => {
    Notifications.scheduleNotificationAsync({
      identifier: `message-${message.id}`,
      content: {
        title: message.user.name,
        body:
          message.type == 'image' || message.type == 'attachment'
            ? `(${message.type})`
            : message.text,
        data: { roomId: message.roomId },
      },
      trigger: null,
    });
  }, []);

  // setup notifications
  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: () => {
        const route = navigationRef.current.getCurrentRoute();

        // do not show if we already are on the chat room screen
        const doNotShow = route && route.name == 'chat-room';

        return Promise.resolve({
          shouldShowAlert: !doNotShow,
          shouldPlaySound: false,
          shouldSetBadge: false,
        });
      },
    });

    // open the chat room screen when the user taps on a notification
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigationRef.current.navigate('chat-room', {
          roomId: response.notification.request.content.data.roomId,
        });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // call the chosen file picker dependency
  const pickFile = React.useCallback(() => {
    return DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: ['image/jpeg', 'image/png', 'application/pdf'],
    }).then((result) => {
      if (result.type == 'cancel') {
        return Promise.reject();
      }

      return {
        name: result.name,
        type: result.mimeType,
        uri: result.uri,
      };
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? (
        <KabelwerkProvider
          url={backend.WEBSOCKET_URL}
          token={token}
          logging="info"
          onNotification={triggerNotification}
        >
          <Stack.Navigator>
            <Stack.Screen name="home" options={{ title: 'Kabelwerk Demo' }}>
              {(props) => <HomeScreen {...props} name={name} logout={logout} />}
            </Stack.Screen>
            <Stack.Screen name="inbox" options={{ title: 'Kabelwerk Inbox' }}>
              {(props) => (
                <KabelwerkInbox
                  {...props}
                  onInboxItemPress={(roomId) =>
                    navigationRef.current.navigate('chat-room', { roomId })
                  }
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="chat-room"
              options={{ title: 'Kabelwerk Chat' }}
            >
              {(props) => (
                <KabelwerkRoomScreen
                  {...props}
                  renderMessageForm={(postMessage, postUpload) => (
                    <KabelwerkMessageForm
                      postMessage={postMessage}
                      postUpload={postUpload}
                      pickFile={pickFile}
                    />
                  )}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </KabelwerkProvider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="no-token" options={{ title: 'Kabelwerk Demo' }}>
            {(props) => (
              <NoTokenScreen {...props} generateUser={generateUser} />
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
