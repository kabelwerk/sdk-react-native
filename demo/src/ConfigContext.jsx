import * as SecureStore from 'expo-secure-store';
import React from 'react';

// the key under which to store the JSON-serialised config
const STORAGE_KEY = 'kabelwerk_config';

const ConfigContext = React.createContext({
  // the Kabelwerk WebSocket URL to connect to
  url: '',

  // the JWT token to connect with
  token: '',

  // update the config values
  update: () => {},

  // whether the config is still being retrieved from the local storage
  isLoading: true,
});

const ConfigProvider = function ({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);

  const [url, setUrl] = React.useState('');
  const [token, setToken] = React.useState('');

  const load = React.useCallback(() => {
    return SecureStore.getItemAsync(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored);
          setUrl(parsed.url ? parsed.url : '');
          setToken(parsed.token ? parsed.token : '');
        } else {
          setUrl('');
          setToken('');
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const update = React.useCallback((newConfig) => {
    return SecureStore.setItemAsync(
      STORAGE_KEY,
      JSON.stringify(newConfig)
    ).then(() => {
      return load();
    });
  }, []);

  React.useEffect(() => {
    load().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <ConfigContext.Provider value={{ url, token, isLoading, update }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
