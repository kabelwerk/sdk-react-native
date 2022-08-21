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
      items: ['KabelwerkInbox', 'KabelwerkInboxItem'],
      collapsible: true,
      collapsed: false,
    },
  ],
};

module.exports = sidebars;
