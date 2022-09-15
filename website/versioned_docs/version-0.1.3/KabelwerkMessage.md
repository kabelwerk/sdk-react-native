# Kabelwerk Message

The `<KabelwerkMessage>` component renders a single chat message in a room.

Most probably you will not directly use the `<KabelwerkMessage>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
<KabelwerkMessage
  message={message}
  theirMarker={42}
  renderCheckmarks={(number) => number == 2 && <Text>seen</Text>}
  onLongPress={(message) => Clipboard.setString(message.text)}
/>
```

## Props

### `message`

A chat message object. Please refer to the [JavaScript SDK docs](https://docs.kabelwerk.io/js/messages) for more information about chat message objects.

### `theirMarker`

The ID of the latest message marked by someone on the hub side. This is used to determine the number of checkmarks shown in the bottom right corner of messages posted by the connected user.

### `renderCheckmarks`

The function used to render the checkmarks in the bottom right corner of messages posted by the connected user. The default is to simply render the corresponding number of ✓ symbols. If you do not want to have checkmarks, pass a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value. This prop is not relevant for messages which have not been posted by the connected user.

### `onLongPress`

Called — with the chat message object — when the user long-presses the component. The default is to copy the message's text to the clipboard if the message is a text message and to do nothing otherwise.

## See also

- [Kabelwerk Markup](./KabelwerkMarkup.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Message Form](./KabelwerkMessageForm.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
