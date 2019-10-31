<template>
  <div class="customer">
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="customers">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="realname" label="真实姓名" align="center" />
        <el-table-column prop="password" label="密码" align="center" />
        <el-table-column prop="telephone" label="电话" align="center" />
        <el-table-column label="详情">
          <template #default="record">
            <a href="" @click.prevent="toDetailsHandler(record.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /表格 -->
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      customer: {}
    }
  },
  computed: {
    ...mapState('customer', ['customers', 'loading'])
  },
  created() {
    this.findAllCustomers()
  },

  methods: {
    // 映射
    ...mapActions('customer', ['findAllCustomers']),
    // 普通方法
    toDetailsHandler(customer) {
      this.$router.push({
        path: './Details',
        query: { id: customer.id }
      })
    }
  }

}
</script>
<style scoped>

</style>
