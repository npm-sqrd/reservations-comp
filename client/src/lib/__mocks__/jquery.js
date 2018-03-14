const $ = jest.genMockFromModule('jquery');

const ajax = (options) => {
  if (options.method === 'GET') {
    if (options.url.endsWith('2018-02-31')) {
      options.error(null, 'error', 'error');
    } else {
      const fakeData = {
        inputOptions: options,
        madeToday: 200,
        reservations: [{
          time: 17,
          remaining: 1,
        },
        {
          time: 18,
          remaining: 2,
        },
        {
          time: 19,
          remaining: 3,
        },
        {
          time: 20,
          remaining: 4,
        },
        {
          time: 21,
          remaining: 5,
        },
        ],
      };
      options.success(fakeData);
    }
  } else if (JSON.parse(options.data).date === '2018-02-31') {
    options.error(null, 'error', 'error');
  } else {
    const fakeData = {
      inputOptions: options,
    };
    options.success(fakeData);
  }
};

$.ajax = ajax;

module.exports = $;
