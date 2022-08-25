# Kabelwerk Inbox Item

The `<KabelwerkInboxItem>` component displays information about a chat room and the latest message in that room (if there is such).

Most probably you will not directly use the `<KabelwerkInboxItem>` component in your code — on the contrary, it is likely that you will want to replace it with a component of your own.

## Example

```jsx
<KabelwerkInboxItem item={item} onPress={onPress} />
```

## Props

### `item`

An inbox item object. Please refer to the [JavaScript SDK docs](https://docs.kabelwerk.io/js/inboxes) for more information about inbox item objects.

### `onPress`

Called when the component is pressed by the user.

## See also

- [Kabelwerk Inbox](./KabelwerkInbox.md)
