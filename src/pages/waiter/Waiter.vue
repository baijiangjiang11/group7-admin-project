<template>
  <div class="waiter">
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="waiters">
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="realname" label="真实姓名" align="center" />
        <el-table-column prop="password" label="密码" align="center" />
        <el-table-column prop="type" label="类型" align="center" />
        <el-table-column prop="telephone" label="电话" align="center" />
        <el-table-column label="详情">
          <template #default="scope">
            <a href="" @click.prevent="toDetailsHandler(scope.row)">查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /表格 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      waiter: {}
    }
  },
  computed: {
    ...mapState('waiter', ['waiters', 'loading'])
  },
  created() {
    this.findAllWaiter()
  },
  methods: {
    ...mapActions('waiter', ['findAllWaiter']),
    // 跳转到详情页面
    toDetailsHandler(waiter) {
      this.$router.push({
        path: './Details',
        query: { id: waiter.id }
      })
    }
  }
}
</script>
<style lang="stylus">

</style>
