<template>
  <div class="detail">
    <!-- 按钮 -->
    <div>
      <el-button size="small" type="primary" @click="returnHandler">返回</el-button>
    </div>
    <!-- /按钮 -->
    订单详情页面
  </div>
</template>
<script>
export default {
  methods: {
    returnHandler() {
      // 返回员工页面
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

</style>
