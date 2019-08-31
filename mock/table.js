import Mock from 'mockjs'

const data = Mock.mock({
  'items|265': [
    {
      id: Mock.Random.increment(),
      time: new Date().getTime(),
      name: '@cname',
      alias: '@cname',
      code: /^SN[0-9]{14,14}/,
      title: '@cword(10, 20)',
      remark: '@cword(50, 200)',
      email: '@email',
      corp: '@cword(10, 30)',
      scorp: '@cword(10, 30)',
      ecorp: '@cword(10, 30)',
      idcard: Mock.Random.id(),
      phone: /^86-[0-9]{8,8}/,
      mobile: /^1[385][1-9]\d{8}/,
      date: '@datetime',
      prov: '@province',
      city: '@city',
      dist: '@county',
      region: Mock.Random.county(true),
      image: Mock.Random.image('200x200', '#50B347', '#FFF', 'Mock.js'),
      nums: '@integer(20, 5000)',
      total: '@integer(20, 5000)',
      price: '@float(5, 300, 2, 2)',
      money: '@float(60, 8888, 2, 2)',
      'status|1': [0, 1],
      'audit|1': ['未审核', '已审核', '已完成'],
      'pstatus|1': ['待支付', '已支付', '已完成'],
      'ptype|1': ['微信支付', '微信扫码', '支付宝扫码', '天易白条'],
      'cancel|1': ['未取消', '已取消'],
      'ticket|1': ['不开票', '普通发票', '专用发票']
    }
  ]
})

const group = Mock.mock({
  items: () => {
    return ['热门', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => {
      return {
        letter: letter,
        content: '@cword(100, 3000)'
      }
    })
  }
})

export default [
  {
    url: '/table/list',
    type: 'get',
    response: param => {
      const query = param.query
      const items = data.items
      query.page = Number(query.page) || 1
      query.limit = Number(query.limit) || 20
      const start = (query.page - 1) * query.limit
      const pages = Math.ceil(items.length / query.limit)
      return {
        status: 0,
        data: {
          pager: {
            first: 1,
            prev: query.page > 1 ? query.page - 1 : 1,
            next: query.page < pages ? query.page + 1 : pages,
            last: pages,
            page: query.page,
            pages: pages,
            limit: query.limit,
            total: items.length
          },
          dataset: items.slice(start, start + query.limit)
        }
      }
    }
  },
  {
    url: '/table/info',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        status: 0,
        data: {
          datarow: items[Math.floor(Math.random() * items.length)]
        }
      }
    }
  },
  {
    url: '/scroll/data',
    type: 'get',
    response: config => {
      return {
        status: 0,
        data: {
          dataset: group.items
        }
      }
    }
  }
]
