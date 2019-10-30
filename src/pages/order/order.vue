<template>
  <div class="order">
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有订单" name="allorder">
        <el-table :data="orders">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="order1">
        <el-table :data="orders.filter(o=>o.status=='待支付')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待派单" name="order2">
        <el-table :data="orders.filter(o=>o.status=='待派单')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="order3">
        <el-table :data="orders.filter(o=>o.status=='待接单')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="order4">
        <el-table :data="orders.filter(o=>o.status=='待服务')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="order5">
        <el-table :data="orders.filter(o=>o.status=='待确认')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="order6">
        <el-table :data="orders.filter(o=>o.status=='已完成')">
          <el-table-column label="订单编号" prop="id" />
          <el-table-column label="下单时间" prop="orderTime" />
          <el-table-column label="总价" prop="total" />
          <el-table-column label="状态" prop="status" />
          <el-table-column label="顾客id" prop="customerId" />
          <el-table-column label="地址id" prop="addressId" />
          <el-table-column label="详情">
            <template #default="scope">
              <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      order: {},
      activeName: 'allorder'
    }
  },
  computed: {
    ...mapState('order', ['orders'])
  },
  created() {
    this.findAllOrder()
  },
  methods: {
    ...mapActions('order', ['findAllOrder']),
    // 跳转到详情页面
    toDetailsHandler(order) {
      this.$router.push({
        path: './Details',
        query: { id: order.id }
      })
    }
  }
}
</script>
<style scoped>

</style>
