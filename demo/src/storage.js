import * as SecureStore from 'expo-secure-store';

// the local storage key under which to store the JSON-serialised config
const STORAGE_KEY = 'kabelwerk_config';

// load a name and a token from the local storage
const load = function () {
  return SecureStore.getItemAsync(STORAGE_KEY).then((value) => {
    if (value) {
      return JSON.parse(value);
    } else {
      return { name: '', token: '' };
    }
  });
};

// update the local storage with a new name and token
const update = function ({ name, token }) {
  return SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify({ name, token }));
};

// delete all from the local storage
const reset = function () {
  return SecureStore.deleteItemAsync(STORAGE_KEY);
};

export { load, update, reset };
