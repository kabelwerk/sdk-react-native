# Kabelwerk Inbox

The `<KabelwerkInbox>` component is essentially a list of the chat rooms that the user has access to, ordered by recency of their latest messages (the room with the most recent message comes first).

The `<KabelwerkInbox>` component is usually only needed when you have more than one Kabelwerk hub.

## Example

```jsx
<KabelwerkInbox
  renderInboxItem={(inboxItem, onPress) => (
    <KabelwerkInboxItem item={inboxItem} onPress={onPress} />
  )}
  onInboxItemPress={(roomId) => navigate('chat-room', { roomId })}
/>
```

## Props

### `renderInboxItem`

The function used to render the inbox items. The default is to render an [`<KabelwerkInboxItem>`](./KabelwerkInboxItem.md) component.

### `onInboxItemPress`

Called when the user presses an inbox item component — with the room ID of the respective inbox item. The rather unhelpful default is to do nothing.

## See also

- [Kabelwerk Inbox Item](./KabelwerkInboxItem.md)
