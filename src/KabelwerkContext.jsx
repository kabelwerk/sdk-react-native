import Kabelwerk from 'kabelwerk';
import React from 'react';

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
}) {
  // the current connection state
  const [state, setState] = React.useState(Kabelwerk.getState);

  // whether Kabelwerk's ready event has been already fired
  const [isReady, setIsReady] = React.useState(false);

  // the Kabelwerk notifier object
  const notifier = React.useRef(null);

  // setup the Kabelwerk connection
  React.useEffect(() => {
    Kabelwerk.config({ url, token, refreshToken, ensureRooms, logging });

    Kabelwerk.on('connected', () => setState(Kabelwerk.getState));
    Kabelwerk.on('disconnected', () => setState(Kabelwerk.getState));

    Kabelwerk.once('ready', () => {
      notifier.current = Kabelwerk.openNotifier();

      notifier.current.on('updated', ({ message }) => {
        console.log(message);
      });

      notifier.current.connect();

      setIsReady(true);
    });

    Kabelwerk.on('error', (error) => {
      console.log(error);
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
  }, [url, token, refreshToken, ensureRooms, logging]);

  return (
    <KabelwerkContext.Provider value={{ state, isReady }}>
      {children}
    </KabelwerkContext.Provider>
  );
};

export { KabelwerkContext, KabelwerkProvider };
