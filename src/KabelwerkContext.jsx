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
  onLocalNotification = undefined,
}) {
  // a number incremented each time the connection needs to be re-established
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

    Kabelwerk.once('ready', () => {
      notifier.current = Kabelwerk.openNotifier();

      notifier.current.on('updated', ({ message }) => {
        if (onLocalNotification) {
          onLocalNotification(message);
        }
      });

      notifier.current.connect();

      setIsReady(true);
    });

    Kabelwerk.on('error', (error) => {
      if (onError) {
        onError(error);
      }
    });

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
    onLocalNotification,
  ]);

  // update the connected user's name
  React.useEffect(() => {
    if (isReady && userName && Kabelwerk.getUser().name != userName) {
      Kabelwerk.updateUser({ name: userName });
    }
  }, [isReady, userName]);

  return (
    <KabelwerkContext.Provider value={{ state, isReady }}>
      {children}
    </KabelwerkContext.Provider>
  );
};

export { KabelwerkContext, KabelwerkProvider };
