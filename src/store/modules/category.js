import request from '@/utils/request'
import { post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    categories: [],
    loading: false,
    visible: false,
    title: '添加栏目信息'

  },
  getters: {

  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    setTitle(state, title) {
      state.title = title
    },
    // 刷新
    refreshCategories(state, categories) {
      state.categories = categories
    },
    // 开始加载
    beginLoading(state) {
      state.loading = true
    },
    // 结束加载
    endLoading(state) {
      state.loading = false
    }

  },
  actions: {
    // 渲染栏目信息
    async findAllCategories({ dispatch, commit }) {
      commit('beginLoading')
      const response = await request.get('/category/findAll')
      commit('refreshCategories', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 3000)
    },
    // 根据id删除栏目信息
    async deleteCategoryById(context, id) {
      const response = await request.get('/category/deleteById?id=' + id)
      context.dispatch('findAllCategories')
      return response
    },
    // 更新栏目信息
    async saveOrUpdateCategory({ commit, dispatch }, payload) {
      // 更新数据
      const response = await post('/category/saveOrUpdate', payload)
      // 刷新页面
      dispatch('findAllCategories')
      // 关闭模态框
      commit('closeModal')
      return response
    }
  }
}
