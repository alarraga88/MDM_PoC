import pkg from 'mockjs';
const { mock } = pkg;

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }:any) => {
      if (body.username === 'admin' && body.password === 'admin') {
        return mock({
          code: 200,
          message: 'success',
          data: {
            token: '@guid',
            username: 'admin',
            role: 'admin',
            avatar: '@image(100x100)',
          }
        })
      }
      return {
        code: 401,
        message: 'Invalid username or password',
        data: null
      }
    }
  },
  {
    url: '/api/user',
    method: 'get',
    response: () => {
      return mock({
        code: 200,
        message: 'success',
        'data|5-10': [
          {
            id: '@id',
            name: '@cname',
            email: '@email',
            age: '@integer(20, 60)',
            address: '@county(true)',
            createTime: '@datetime'
          }
        ]
      })
    }
  }
]