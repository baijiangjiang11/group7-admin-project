import request from '@/utils/request'
import {get} from '@/http/axios'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    orders:[],
    message:'',
    // visible:false,
    // title:"添加顾客信息",
    loading:false
  },
  getters:{
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  mutations:{
    resetMessage(state,message){
      state.message = message;
    },
    refreshOrders(state,orders){
      state.orders = orders;
    },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
    // 派单
    async sendOrder({commit,dispatch},params){
      console.log("2",params);
      let response = await get("/order/sendOrder",params);
      console.log(response);
      dispatch("findAllOrders");
      return response;
    },
    // 取消派单
    async cancelSendOrder({commit,dispatch},orderId){
      let response = await request.get("/order/cancelSendOrder",{orderId});
      dispatch("findAllOrders");
      return response;
    },
    async findAllOrders({dispatch,commit}){
      // 1. ajax查询
      commit("beginLoading");
      let response = await request.get("/order/findAll");
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
      })
      // 2. 将查询结果更新到state中
      commit("refreshOrders",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    }
  }
}