# Kabelwerk Message

The `<KabelwerkMessage>` component renders a single chat message in a room.

Probably you will not directly use the `<KabelwerkMessage>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
<KabelwerkMessage
  message={message}
  theirMarker={42}
  renderCheckmarks={(number) => number == 2 && <Text>seen</Text>}
  renderTime={(d) => <Text>{d.toTimeString().substring(0, 5)}</Text>}
  onPress={(message) =>
    message.type != 'text' && Linking.openURL(message.upload.original.url)
  }
  onLongPress={(message) =>
    message.type == 'text' && Clipboard.setString(message.text)
  }
  style={{ borderRadius: 10 }}
/>
```

## Props

### `message`

A chat message object. Please refer to the [JavaScript SDK docs](https://docs.kabelwerk.io/js/messages) for more information about chat message objects.

### `theirMarker`

The ID of the latest message marked by someone on the hub side. This is used to determine the number of checkmarks shown in the bottom right corner of messages posted by the connected user.

### `renderCheckmarks`

The function used to render the checkmarks in the bottom right corner of messages posted by the connected user. The default is to simply render the corresponding number of ✓ symbols. If you do not want to have checkmarks, pass a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value. This prop is not relevant for messages which have not been posted by the connected user.

### `renderTime`

The function used to render the message's posting time in the bottom right corner of the component. The function is invoked with the posting timestamp as a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). The default is to render a `HH:MM` string (the 24-hour format).

### `onPress`

Called — with the chat message object — when the user presses the component. The default is to do nothing if the message is a text message and to open the browser with the message's upload otherwise.

### `onLongPress`

Called — with the chat message object — when the user long-presses the component. The default is to copy the message's text to the clipboard if the message is a text message and to do nothing otherwise.

### `style`

An object with extra styles to be applied to the message container component. You may want to use this to, for example, set a different background colour for messages authored by the connected user.

## See also

- [Kabelwerk Markup](./KabelwerkMarkup.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Message Form](./KabelwerkMessageForm.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
