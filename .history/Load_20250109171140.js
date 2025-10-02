const autocannon = require('autocannon');
 
const check = (url, params, callback) => {
  autocannon(
    {
      url,
      headers: {
        ...params.headers,
        'content-type': 'application/json',
      },
      requests: [
        {
          body: JSON.stringify(params.body),
          method: 'POST',
        },
      ],
      connections: 200,
      pipelining: 1,
      duration: 20,
    },
    (err, res) => {
      console.log({
        url,
        requests: {
          average: res.requests.average,
          min: res.requests.min,
          max: res.requests.max,
          total: res.requests.total,
          sent: res.requests.sent,
        },
        statusCodeStats: res.statusCodeStats,
      });
      callback && callback();
    }
  );
};
 
(() => {
  const pathname = 'api/actions';
  const origin = 'https://dev.1opexpertus.expertus.com.ua'
 
  const url = `${origin}/${pathname}`;
  const params = {
    headers: {
      cookie: `system-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMzE4MTc4LCJlbWFpbCI6InlldmhlbmlpLmRhdnlkZW5rb0BsYXNvZnQub3JnIiwiZmlvIjoi0JLQuNC70YzQs9C10LvRjNC80LjQvdCw0JDQkSDQmtC-0L3RgdGC0LDQvdGC0LjQvdC-0LLQsCIsInBob25lIjoiNjc3Nzc3NzcwIiwiam9iX2lkIjoiNzhhOWJkODMtYjdjOS00N2IxLWIyM2EtNTIzNDgxNzYxNjAyIiwidHlwZSI6ImFjY2VzcyIsImlwQWRkcmVzcyI6IjE3Ni44LjIxMC4xNzgiLCJpYXQiOjE3MzYzMzI5MzUsImV4cCI6MTczNjkzNzczNX0.RimnNn5ab_cy68wdtDDUTX_JUCREsYlQjKs8ycz1938`,
    },
    body: { current_page: 'https://dev.1opexpertus.expertus.com.ua/', prev_page: 'https://dev.1opexpertus.expertus.com.ua/' },
  };
 
   check(url, params);
 
//   check(url, params, () => {
    check(`https://dev.1opexpertus.expertus.com.ua/api/actions`, {
      headers: {
        cookie: `system-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMzE4MTc4LCJlbWFpbCI6InlldmhlbmlpLmRhdnlkZW5rb0BsYXNvZnQub3JnIiwiZmlvIjoi0JLQuNC70YzQs9C10LvRjNC80LjQvdCw0JDQkSDQmtC-0L3RgdGC0LDQvdGC0LjQvdC-0LLQsCIsInBob25lIjoiNjc3Nzc3NzcwIiwiam9iX2lkIjoiNzhhOWJkODMtYjdjOS00N2IxLWIyM2EtNTIzNDgxNzYxNjAyIiwidHlwZSI6ImFjY2VzcyIsImlwQWRkcmVzcyI6IjE3Ni44LjIxMC4xNzgiLCJpYXQiOjE3MzYzMzI5MzUsImV4cCI6MTczNjkzNzczNX0.RimnNn5ab_cy68wdtDDUTX_JUCREsYlQjKs8ycz1938`,
      },
      body: { current_page: 'https://dev.1opexpertus.expertus.com.ua/', prev_page: 'https://dev.1opexpertus.expertus.com.ua/' },
    });
//   });
})();