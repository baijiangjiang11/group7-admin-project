import request from '@/utils/request'
import { post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    products: [],
    visible: false,
    title: '添加产品信息',
    categories: [],
    product: {}// 当前产品信息
  },
  getters: {
    productSize(state) {
      return state.products.length
    },
    orderProduct: (state) => {
      return function(flag) {
        state.products.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.products
      }
    }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshProducts(state, products) {
      state.products = products
    },
    refreshProduct(state, product) {
      state.product = product
    },
    setTitle(state, title) {
      state.title = title
    },
    refreshCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async batchDeleteProduct(context, ids) {
      // 1. 批量删除
      const response = await post_array('/product/batchDelete', { ids })
      // 2. 分发
      context.dispatch('findAllProducts')
      // 3. 返回结果
      return response
    },
    async deleteProductById(context, id) {
      const response = await request.get('/product/deleteById?id=' + id)
      context.dispatch('findAllProducts')
      return response
    },
    async findProductById(context, id) {
      const response = await request.get('/product/findById?id=' + id)
      context.commit('refreshProduct', response.data)
    },
    async searchProductById(context, id) {
      const response = await request.get('/product/findById', { id })
      context.dispatch('findAllProducts')
      return response
    },
    async findAllProducts(context) {
      // 1. ajax查询
      const response = await request.get('/product/findAll')
      // 2. 将查询结果更新到state中
      context.commit('refreshProducts', response.data)
    },
    // payload 顾客信息
    async saveOrUpdateProduct({ commit, dispatch }, payload) {
      // 1. 保存或更新
      const response = await post('/product/saveOrUpdate', payload)
      // 2. 刷新页面
      dispatch('findAllProducts')
      // 3. 关闭模态框
      commit('closeModal')
      // 4. 提示
      return response
    },
    async findAllCategories({ dispatch, commit }) {
      // 1.ajax查询
      const response = await request.get('/category/findAll')
      // 将查询结果更新到state中
      commit('refreshCategories', response.data)
    }
  }
}
