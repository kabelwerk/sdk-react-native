import Kabelwerk from 'kabelwerk';
import React from 'react';

const KabelwerkContext = React.createContext({
  state: Kabelwerk.getState(),
});

const KabelwerkProvider = function (props) {
  // the current connection state
  const [state, setState] = React.useState(Kabelwerk.getState);

  // the Kabelwerk notifier object
  const notifier = React.useRef(null);

  const setupNotifier = function () {
    notifier.current = Kabelwerk.openNotifier();

    notifier.current.on('updated', ({ message }) => {
      console.log(message);
    });

    notifier.current.connect();
  };

  // setup the Kabelwerk connection
  React.useEffect(() => {
    Kabelwerk.config(props);

    Kabelwerk.on('connected', () => setState(Kabelwerk.getState));
    Kabelwerk.on('disconnected', () => setState(Kabelwerk.getState));

    Kabelwerk.once('ready', () => {
      setupNotifier();
    });

    Kabelwerk.connect();
    setState(Kabelwerk.getState);

    return () => {
      // this also removes all attached event listeners
      Kabelwerk.disconnect();
    };
  }, []);

  return (
    <KabelwerkContext.Provider value={{ state }}>
      {props.children}
    </KabelwerkContext.Provider>
  );
};

export { KabelwerkContext, KabelwerkProvider };
