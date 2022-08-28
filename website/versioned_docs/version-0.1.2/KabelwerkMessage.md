# Kabelwerk Message

The `<KabelwerkMessage>` component renders a single chat message in a room.

Most probably you will not directly use the `<KabelwerkMessage>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
<KabelwerkMessage message={message} theirMarker={42} />
```

## Props

### `message`

A chat message object. Please refer to the [JavaScript SDK docs](https://docs.kabelwerk.io/js/messages) for more information about chat message objects.

### `theirMarker`

The ID of the latest message marked by someone on the hub side. This is used to determine the number of checkmarks shown in the bottom right corner of messages posted by the connected user.

## See also

- [Kabelwerk Markup](./KabelwerkMarkup.md)
- [Kabelwerk Message Separator](./KabelwerkMessageSeparator.md)
- [Kabelwerk Message Form](./KabelwerkMessageForm.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
