# Kabelwerk Room

The `<KabelwerkRoom>` component renders a chat room.

## Example

```jsx
<KabelwerkRoom
  roomId={42}
  renderMessage={(message) => <KabelwerkMessage message={message} />}
  renderMessageSeparator={(date) => <KabelwerkMessageSeparator date={date} />}
  renderMessageForm={(postMessage, postUpload) => (
    <KabelwerkMessageForm postMessage={postMessage} postUpload={postUpload} />
  )}
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

## See also

- [Kabelwerk Message](./KabelwerkMessage.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Message Form](./KabelwerkMessageForm.md)
- [Kabelwerk Room Screen](./KabelwerkRoomScreen.md)
