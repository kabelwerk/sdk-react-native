# Kabelwerk Context

The Kabelwerk context takes care of opening and maintaining the websocket connection to the Kabelwerk backend — also across [AppState](https://reactnative.dev/docs/appstate) changes.

Most components in this SDK depend on this context and should be wrapped by a configured `<KabelwerkProvider>` in order to function.

## Example

```jsx
<KabelwerkProvider
  url="myapp.kabelwerk.io"
  refreshToken={fetchAuthToken}
  logging={__DEV__ ? 'info' : 'silent'}
  onError={handleError}
>
  {/* chat screens */}
</KabelwerkProvider>
```

## Props

### `url`

The URL of the Kabelwerk backend to connect to.

### `token`

A [JWT](https://datatracker.ietf.org/doc/html/rfc7519) token which:

- is signed by an RSA key the public counterpart of which is known to the Kabelwerk backend you are connecting to;
- includes a `sub` claim identifying the user on behalf of whom the connection is established;
- includes a valid `exp` claim.

The value of the `sub` claim is stored on the Kabelwerk backend as the respective user's key.

### `refreshToken`

A function that takes as argument the current authentication token and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving into a new authentication token (or perhaps the same token if no refresh is needed). If you provide only a `token`, it will be used both for the initial connection and then again each time when reconnecting. If you provide only a `refreshToken` function, it will be called to obtain the initial connection token, and then it will be called again each time when reconnecting. If you provide both a `token` and a `refreshToken` function, then the former will be used for the initial connection, and the latter each time when reconnecting.

### `userName`

A name for the connected user. The default value is `'anonymous'`.

### `ensureRooms`

If this prop is set, Kabelwerk will make sure that the connected user has a room on each of the specified hubs. The value could be either a list of hub slugs or the string `'all'` — in which case a room is created for the user on every hub. If Kabelwerk fails to ensure that the rooms are created (e.g. if there does not exists a hub with one of the given slugs), the [`onError`](#onerror) handler is called and the connection is terminated.

### `logging`

One of the (case-insensitive) strings `'debug'`, `'info'`, `'error'`, or `'silent'`. The last one is the default value, meaning that no logs will be written unless this prop is explicitly set to another value.

### `onError`

Called when there is an error.

### `onNotification`

Called when a new message is posted in any of the rooms of the connected user (of course, excluding messages authored by the latter). In case the websocket connection temporarily drops, upon reconnecting the callback will be invoked for each message missed while the client was disconnected.

### `pushNotificationsToken`

A [Firebase registration token](https://firebase.google.com/docs/cloud-messaging) to be stored on the Kabelwerk backend and used to send a push notification to the device whenever a new message is posted in any of the rooms of the connected user. You can ignore this prop if you cannot or do not want to rely on Firebase — in which case you can use the [`onNotification`](#onnotification) handler as a reasonably good substitute.

### `pushNotificationsEnabled`

A boolean allowing you to toggle the sending of Firebase push notifications to the device (useful if you want to, e.g., implement a setting enabling the user to pause the notifications). The default value is `true`. This prop is ignored unless the [`pushNotificationsToken`](#pushnotificationstoken) prop has been set.

## See also

- [Kabelwerk Inbox](./KabelwerkInbox.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
