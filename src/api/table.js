import request from '@/utils/request'

const mockApi = {
  getList(params) {
    return request({
      url: '/table/list',
      method: 'get',
      params
    })
  },

  getInfo(params) {
    return request({
      url: '/table/info',
      method: 'get',
      params
    })
  },

  scrollData() {
    return request({
      url: '/scroll/data',
      method: 'get'
    })
  }
}

export { mockApi }
