import Kabelwerk from 'kabelwerk';
import React from 'react';
import { AppState } from 'react-native';

const KabelwerkContext = React.createContext({
  state: Kabelwerk.getState(),
  isReady: false,
});

const KabelwerkProvider = function ({
  children,
  url = undefined,
  token = undefined,
  refreshToken = undefined,
  ensureRooms = 'all',
  logging = 'silent',
  userName = undefined,
  onError = undefined,
  onNotification = undefined,
}) {
  // an int incremented each time the connection needs to be re-established
  // after having been closed by the OS
  const [revivalsCount, setRevivalsCount] = React.useState(0);

  // the current Kabelwerk connection state
  const [state, setState] = React.useState(Kabelwerk.getState);

  // whether Kabelwerk's ready event has been already fired
  const [isReady, setIsReady] = React.useState(false);

  // the Kabelwerk notifier object
  const notifier = React.useRef(null);

  // setup an app state event listener
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', (appState) => {
      // some time after the app is moved to the background, the OS closes the
      // websocket connection with code 1000 (normal closure) — which sets the
      // state to INACTIVE
      if (appState == 'active' && Kabelwerk.getState() == Kabelwerk.INACTIVE) {
        // bump the revival count in order to trigger a reconnection
        setRevivalsCount((count) => count + 1);
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // setup (and clean up after) the Kabelwerk connection
  React.useEffect(() => {
    Kabelwerk.config({ url, token, refreshToken, ensureRooms, logging });

    Kabelwerk.on('connected', () => setState(Kabelwerk.getState));
    Kabelwerk.on('disconnected', () => setState(Kabelwerk.getState));

    Kabelwerk.once('ready', ({ user }) => {
      // setup the notifier object, if one is needed
      if (onNotification) {
        notifier.current = Kabelwerk.openNotifier();

        notifier.current.on('ready', ({ messages }) => {
          // the received messages are the newest first
          for (let i = messages.length - 1; i >= 0; i--) {
            onNotification(messages[i]);
          }
        });

        notifier.current.on('updated', ({ message }) => {
          onNotification(message);
        });

        notifier.current.connect();
      }

      // update the connected user's name, if needed
      if (userName && user.name != userName) {
        Kabelwerk.updateUser({ name: userName });
      }

      setIsReady(true);
    });

    if (onError) {
      Kabelwerk.on('error', onError);
    }

    Kabelwerk.connect();
    setState(Kabelwerk.getState);

    return () => {
      // reset the refs
      if (notifier.current) {
        notifier.current.disconnect();
        notifier.current = null;
      }

      // this also removes all attached event listeners
      Kabelwerk.disconnect();

      // reset the state
      setState(Kabelwerk.getState);
      setIsReady(false);
    };
  }, [
    revivalsCount,
    url,
    token,
    refreshToken,
    ensureRooms,
    logging,
    onError,
    onNotification,
    userName,
  ]);

  return (
    <KabelwerkContext.Provider value={{ state, isReady }}>
      {children}
    </KabelwerkContext.Provider>
  );
};

export { KabelwerkContext, KabelwerkProvider };
