# Kabelwerk Markup

The `<KabelwerkMarkup>` component converts an HTML string into a list of [`<Text>`](https://reactnative.dev/docs/text) components — one for each `<p>` in the input.

You may want to use the `<KabelwerkMarkup>` component if you are overwriting the [`<KabelwerkMessage>`](./KabelwerkMessage.md) component for rendering chat messages, but you do not want to implement your own HTML to React Native or markdown to React Native converter.

## Example

```jsx
<KabelwerkMarkup html={'<p>hello!</p>'} />
```

## Props

### `html`

The HTML string to render.

## See also

- [Kabelwerk Message](./KabelwerkMessage.md)
