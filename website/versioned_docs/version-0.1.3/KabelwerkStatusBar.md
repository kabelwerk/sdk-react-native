# Kabelwerk Status Bar

The `<KabelwerkStatusBar>` component renders a small horizontal bar with status info whenever the Kabelwerk [connection state](https://docs.kabelwerk.io/js/connection-states) is either **`INACTIVE`** or **`CONNECTING`**. The status bar automatically disappears whenever the connection state goes back to **`ONLINE`**.

The `<KabelwerkStatusBar>` component is included by default in the [`<KabelwerkInbox>`](./KabelwerkInbox.md) and [`<KabelwerkRoom>`](./KabelwerkRoom.md) components.

## Example

```jsx
<KabelwerkStatusBar />
```

## See also

- [Kabelwerk Inbox](./KabelwerkInbox.md)
- [Kabelwerk Room](./KabelwerkRoom.md)
