# Kabelwerk Room

The `<KabelwerkRoom>` component renders a chat room.

## Example

```jsx
<KabelwerkRoom
  roomId={42}
  renderMessage={(message, theirMarker) => (
    <KabelwerkMessage message={message} theirMarker={theirMarker} />
  )}
  renderMessageSeparator={(date) => <KabelwerkMessageSeparator date={date} />}
  renderMessageForm={(postMessage, postUpload) => (
    <KabelwerkMessageForm postMessage={postMessage} postUpload={postUpload} />
  )}
  renderWelcomeBanner={() => <Text>Send us a message!</Text>}
  onReady={(room) => room.updateAttributes({ lastOpened: new Date() })}
/>
```

## Props

### `roomId`

The ID of the room to render. If this prop is not set, a random room belonging to the connected user will be rendered — which is useful when you have a single hub.

### `renderMessage`

The function used to render the chat messages in the room. The default is to render a [`<KabelwerkMessage>`](./KabelwerkMessage.md) component.

### `renderMessageSeparator`

The function used to render the separators between messages posted on different dates. The default is to render a [`<KabelwerkMessageSeparator>`](./KabelwerkMessageSeparator.md) component.

### `renderMessageForm`

The function used to render the form for posting new messages. The default is to render a [`<KabelwerkMessageForm>`](./KabelwerkMessageForm.md) component.

### `renderWelcomeBanner`

Called to render a welcome banner when the user has neither posted nor received any messages in the chat room yet. The default is not to render anything.

### `onReady`

Called when the connection to the backend for this room is first established. Called with the respective [room object](https://docs.kabelwerk.io/js/rooms). You can use this to update the room's [custom attributes](https://docs.kabelwerk.io/js/rooms#custom-attributes). The default is a no-op.

## See also

- [Kabelwerk Message](./KabelwerkMessage.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Message Form](./KabelwerkMessageForm.md)
- [Kabelwerk Room Screen](./KabelwerkRoomScreen.md)
