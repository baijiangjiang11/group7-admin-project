import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {
    refreshOrders(state, orders) {
      state.orders = orders
    }
  },
  actions: {
    // 查询所有订单信息
    async findAllOrder({ dispatch, commit }) {
      const response = await request.get('./order/findAll')
      commit('refreshOrders', response.data)
    }
  }
}
