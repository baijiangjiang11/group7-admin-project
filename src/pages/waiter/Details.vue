<template>
  <div class="detail">
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="primary" @click="returnHandler">返回</el-button>
    </div>
    <!-- /按钮 -->
    员工详情页面
  </div>
</template>
<script>
export default {
  methods: {
    returnHandler() {
      // 返回员工页面
      // this.$router.push("/waiter/Waiter")
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

</style>
