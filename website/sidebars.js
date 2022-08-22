const sidebars = {
  tutorialSidebar: [
    'README',
    {
      type: 'category',
      label: 'Contexts',
      items: ['KabelwerkContext'],
      collapsible: true,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'KabelwerkInbox',
        'KabelwerkInboxItem',
        'KabelwerkRoom',
        'KabelwerkStatusBar',
      ],
      collapsible: true,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Screens',
      items: ['KabelwerkRoomScreen'],
      collapsible: true,
      collapsed: false,
    },
  ],
};

module.exports = sidebars;
