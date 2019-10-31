import request from '@/utils/request'
export default {
  namespaced: true,
  state: {
    customers: [],
    loading: false
  },
  getters: {

  },
  // 突变
  mutations: {
    refreshCustomers(state, customers) {
      state.customers = customers
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    }

  },
  // 查询所有顾客信息
  actions: {
    async findAllCustomers({ dispatch, commit }) {
      commit('beginLoading')
      const response = await request.get('/customer/findAll')
      // 将查询结果返回到state中
      commit('refreshCustomers', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    }
  }
}
