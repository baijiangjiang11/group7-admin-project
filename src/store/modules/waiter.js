import request from '@/utils/request'

export default {
  namespaced: true,
  state: {
    waiters: [],
    loading: false
  },
  mutations: {
    refreshWaiters(state, waiters) {
      state.waiters = waiters
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    }
  },
  actions: {
    // 查询所有员工信息
    async findAllWaiter({ dispatch, commit }) {
      commit('beginLoading')
      const response = await request.get('./waiter/findAll')
      commit('refreshWaiters', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    }
  }
}
