export default function () {
  return [{
    title: 'Dashboards',
    items: [{
      title: 'Home',
      to: '/',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }, {
      title: 'Vendor',
      to: '/merchant',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }],
  }, {
    title: 'Campaign',
    items: [{
      title: 'Merchant Deals',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'deals',
      },
    }, {
      title: 'E-Commerce Deals',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'product-deals',
      },
    }, {
      title: 'Earn',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'earn',
      },
    }, {
      title: 'Win',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'win',
      },
    }, {
      title: 'Audience',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'audience',
      },
    }],
  }, {
    title: 'Entertainment',
    items: [{
      title: 'News',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'news',
      },
    }, {
      title: 'Stream',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'stream',
      },
    }, {
      title: 'Event',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'event',
      },
    }, {
      title: 'Horoscope',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: {
        name: 'horoscope',
      },
    }],
  }];
}
