# KabelwerkInbox

The `<KabelwerkInbox>` component is a list of the chat rooms that the user has access to, ordered by recency of their latest messages (the room with the most recent message comes first).

The `<KabelwerkInbox>` component is usually only needed when you have more than one Kabelwerk hub.

## Example

```jsx
<KabelwerkInbox onItemPress={(roomId) => navigate('chat-room', { roomId })} />
```

## Props

### `onItemPress`

Called when the user presses an inbox item component.

## See also

- [KabelwerkInboxItem](./KabelwerkInboxItem.md)
