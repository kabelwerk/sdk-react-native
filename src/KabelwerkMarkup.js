import React from 'react';
import { Linking, Text } from 'react-native';

// regex matching html tags, both opening and closing
//
// capturing groups:
//
// - 1 → whether the tag is a closing one
// - 2 → the tag itself
// - 3 → the tag's attributes, if such
//
// we cannot use named capturing groups as these are not supported by hermes
const TAG_REGEX = /<(\/)?([a-z]+)([^<>]+)*>/g;

// regex matching html tag attributes
// group 1 captures an attribute key, group 2 captures its value
const ATTRS_REGEX = /([a-z]+)="([^<"'>\s]+)"/g;

// a dict mapping html tags to functions creating react native components
//
// as react native cannot automatically assign keys to components created in
// this manner, we use the index of the last char of the tag as key
const ELEMENTS = Object.freeze({
  p: function (_, children, index) {
    return React.createElement(
      Text,
      { key: index, style: { marginBottom: 8 } },
      children
    );
  },
  em: function (_, children, index) {
    return React.createElement(
      Text,
      { key: index, style: { fontStyle: 'italic' } },
      children
    );
  },
  strong: function (_, children, index) {
    return React.createElement(
      Text,
      { key: index, style: { fontWeight: 'bold' } },
      children
    );
  },
  a: function (attrs, children, index) {
    return React.createElement(
      Text,
      {
        key: index,
        style: { textDecorationLine: 'underline' },
        onPress: () => Linking.openURL(attrs.href),
      },
      children
    );
  },
});

// convert an html string into a list of <Text> components — one for each <p>
const convert = function (html, elemDict) {
  // react native does not have string.matchAll(regex)
  const regex = new RegExp(TAG_REGEX);

  // a list of <Text> components, one for each <p>
  const output = [];

  // a list of {tag, attrs, children} objects
  const stack = [];

  // the current regex match
  let match;

  // the index of the last char that has been already parsed
  let index = 0;

  // add a child to the stack's top element
  // if the stack is empty, add directly to the output
  const addChild = function (child) {
    if (stack.length) {
      stack[stack.length - 1].children.push(child);
    } else {
      output.push(child);
    }
  };

  // remove the newlines — only <br>'s can insert newlines
  html = html.replace(/\n/g, '');

  while ((match = regex.exec(html))) {
    if (match.index > index) {
      addChild(html.slice(index, match.index));
    }

    index = match.index + match[0].length;

    if (match[2] == 'br') {
      addChild('\n');
    } else if (elemDict.hasOwnProperty(match[2])) {
      if (match[1]) {
        // this is a closing tag

        // take the stack's top element, convert it into the respective react
        // native component, and add it as a child of the new stack top
        const elem = stack.pop();
        addChild(elemDict[elem.tag](elem.attrs, elem.children, index));
      } else {
        // this must be an opening tag as the only self-closing tag we support
        // is <br> — which is handled above

        // new element on top of the stack
        stack.push({
          tag: match[2],
          attrs: match[3] ? parseAttrs(match[3]) : null,
          children: [],
        });
      }
    } else {
      // this is an unrecognised tag
      addChild(match[0]);
    }
  }

  return output;
};

// helper for the convert function above
const parseAttrs = function (htmlAttrs) {
  const regex = new RegExp(ATTRS_REGEX);
  const attrs = Object.create(null);

  let match;
  while ((match = regex.exec(htmlAttrs))) {
    attrs[match[1]] = match[2];
  }

  return attrs;
};

const KabelwerkMarkup = function ({ html, elements }) {
  let elemDict = ELEMENTS;

  if (elements) {
    elemDict = Object.assign({}, ELEMENTS, elements);
  }

  return convert(html, elemDict);
};

export { KabelwerkMarkup, convert };
