// the host of the Kabelwerk backend serving the app
const HOST = 'hubdemo.kabelwerk.io';

// the websocket URL for the JavaScript SDK
const WEBSOCKET_URL = `wss://${HOST}/socket/user`;

// the endpoint for generating demo users
const GENERATE_USER_URL = `https://${HOST}/api/demo-users`;

// generate a new demo user
const generateUser = function () {
  return fetch(GENERATE_USER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'anonymous' }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export { WEBSOCKET_URL, generateUser };
