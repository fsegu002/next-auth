import { rest } from 'msw';

const handlers = [
  rest.post('http://localhost:3000/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          auth: true,
          id: '1',
          email: 'test1@email.com'
        },
        token: 'authToken'
      })
    );
  }),
  rest.post('http://localhost:3000/api/v1/auth/register', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          auth: true,
          id: '1',
          email: 'test1@email.com'
        }
      })
    );
  })
];
export { handlers };
