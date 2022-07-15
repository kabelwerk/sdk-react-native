import { convert } from '../src/KabelwerkMarkup.js';

describe('convert', () => {
  const ELEMENTS = {
    p: (_, children) => ['p', ...children],
    em: (_, children) => ['em', ...children],
    strong: (_, children) => ['strong', ...children],
    a: (attrs, children) => ['a', attrs.href, ...children],
  };

  const match = (html, output) => {
    expect(convert(html, ELEMENTS)).toEqual(output);
  };

  test('special chars', () => {
    match('<p>&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;</p>', [
      ['p', '&lt;script&gt;alert(&#39;XSS&#39;);&lt;/script&gt;'],
    ]);
  });

  test('line breaks', () => {
    match('<p><br></p>', [['p', '\n']]);

    match('<p>with <br><em>nesting<br> support</em></p>', [
      ['p', 'with ', '\n', ['em', 'nesting', '\n', ' support']],
    ]);

    // <p>lorem<br>
    // ipsum</p>
    match(`<p>lorem<br>\nipsum</p>`, [['p', 'lorem', '\n', 'ipsum']]);
  });

  test('links', () => {
    match(
      '<p><a href="https://kabelwerk.io" target="_blank">https://kabelwerk.io</a></p>',
      [['p', ['a', 'https://kabelwerk.io', 'https://kabelwerk.io']]]
    );

    match(
      '<p><a target="_blank" href="https://глагол.орг/прашни-думи/">прашни думи</a> на български</p>',
      [
        [
          'p',
          ['a', 'https://глагол.орг/прашни-думи/', 'прашни думи'],
          ' на български',
        ],
      ]
    );
  });

  test('emphasis', () => {
    match(
      '<p>This is text <strong>bold <em>italic bold</em></strong> with more text</p>',
      [
        [
          'p',
          'This is text ',
          ['strong', 'bold ', ['em', 'italic bold']],
          ' with more text',
        ],
      ]
    );

    match('<p><strong><em>bold and italic</em></strong></p>', [
      ['p', ['strong', ['em', 'bold and italic']]],
    ]);

    match('<p><em>italic <strong>italic and bold</em></strong></p>', [
      ['p', ['em', 'italic ', ['strong', 'italic and bold']]],
    ]);

    match('<p><strong><em>italic and bold</em> bold</strong></p>', [
      ['p', ['strong', ['em', 'italic and bold'], ' bold']],
    ]);
  });

  test('unknown tags', () => {
    match('<p><hr></p>', [['p', '<hr>']]);

    match('<p><img src="https://kabelwerk.io/images/logo_256.png" /></p>', [
      ['p', '<img src="https://kabelwerk.io/images/logo_256.png" />'],
    ]);

    match('<p><ul><li>lorem ipsum</li></ul></p>', [
      ['p', '<ul>', '<li>', 'lorem ipsum', '</li>', '</ul>'],
    ]);
  });

  test('unknown attributes', () => {
    match('<p><em class="unknown">?</em></p>', [['p', ['em', '?']]]);
  });

  test('multiple paragraphs', () => {
    match('<p></p><p><em>lorem<br>ipsum</em></p>', [
      ['p'],
      ['p', ['em', 'lorem', '\n', 'ipsum']],
    ]);

    // <p><strong>strong</strong><br>
    // <em>em</em></p>
    // <p><a href="https://kabelwerk.io" target="_blank">link</a></p>
    match(
      '<p><strong>strong</strong><br>\n<em>em</em></p>\n<p><a href="https://kabelwerk.io" target="_blank">link</a></p>',
      [
        ['p', ['strong', 'strong'], '\n', ['em', 'em']],
        ['p', ['a', 'https://kabelwerk.io', 'link']],
      ]
    );
  });
});
