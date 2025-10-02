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
  const origin = 'https://dev.1glexpertus.expertus.com.ua';
 
  const url = `${origin}/${pathname}`;
  const params = {
    headers: {
      cookie: `system-token=1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMDA3MTA1LCJlbWFpbCI6Im9rdWtoYXJ1a0BleHBlcnR1cy5jb20udWEiLCJmaW8iOiLQntC70LXQutGB0LDQvdC00YAg0JrRg9GF0LDRgNGD0LoiLCJwaG9uZSI6Ijk4NTQ2MTQ2NCIsImpvYl9pZCI6ImE1ODlmZjI4LTkwYzItNGVlYi05NTg2LWE0YTc1N2UzZGRhZCIsInR5cGUiOiJhY2Nlc3MiLCJpcEFkZHJlc3MiOiI0Ni4xNTAuNzEuNDAiLCJpYXQiOjE3MzYxNTI3NTIsImV4cCI6MTczNjc1NzU1Mn0.Z_JhF-N2-Jy28K91J0yMaStVod0X54n76vbRbbYrNq4; system-session-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMDA3MTA1LCJwcm9kdWN0SWQiOjMwMDAwLCJwcm9kdWN0VmVyc2lvbiI6MzAwMDEsInVrZCI6IjAwMDItMTYwMS0wMTY4LTQ2NDMtNTQ3Ni0xODU4IiwiaXNBdXRoIjp0cnVlLCJhY2Nlc3MiOnRydWUsImVtYWlsIjoib2t1a2hhcnVrQGV4cGVydHVzLmNvbS51YSIsIm5hbWUiOiLQntC70LXQutGB0LDQvdC00YAiLCJ1c2VySGFzaCI6ImFjNjRkYzVmMGE5NjNjODc1ODFkZjZhMmMwZWJjN2M3OWViMzdjYmQyMzc3NTcxZDU3ZTgxNmIwNzIwMWE3M2UiLCJpYXQiOjE3MzYxNTM5MjksImV4cCI6MTczNjI0MDMyOX0.pz6pO1r24CvEHbwVKiAO41A38e_0zGwctcZmJs0YGuI; intercom-session-vb1xfr0n=ODQ5dDY5Q0JqZmcvKzQybU40V1Z4bTUzZUpRMytIbnpUc3UrSm9DOFJicnc2dnBCTUh2NU44Z2RhMEZ0WmlTUC0tUENlSk1NVGpNenRtQzlnM0NNZThwZz09--e2badc914ec5fd97352e1aa7e1cedf207e97f59c`,
    },
    body: { current_page: 'https://dev.1glexpertus.expertus.com.ua/', prev_page: 'https://dev.1glexpertus.expertus.com.ua/' },
  };
 
  // check(url, params);
 
//   check(url, params, () => {
    check(`https://dev.1opexpertus.expertus.com.ua/api/actions`, {
      headers: {
        cookie: `system-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMzE4MTc4LCJlbWFpbCI6InlldmhlbmlpLmRhdnlkZW5rb0BsYXNvZnQub3JnIiwiZmlvIjoi0JLQuNC70YzQs9C10LvRjNC80LjQvdCw0JDQkSDQmtC-0L3RgdGC0LDQvdGC0LjQvdC-0LLQsCIsInBob25lIjoiNjc3Nzc3NzcwIiwiam9iX2lkIjoiNzhhOWJkODMtYjdjOS00N2IxLWIyM2EtNTIzNDgxNzYxNjAyIiwidHlwZSI6ImFjY2VzcyIsImlwQWRkcmVzcyI6IjE3Ni44LjIxMC4xNzgiLCJpYXQiOjE3MzYzMzI5MzUsImV4cCI6MTczNjkzNzczNX0.RimnNn5ab_cy68wdtDDUTX_JUCREsYlQjKs8ycz1938`,
      },
      body: { current_page: 'https://dev.1opexpertus.expertus.com.ua/', prev_page: 'https://dev.1opexpertus.expertus.com.ua/' },
    });
//   });
})();