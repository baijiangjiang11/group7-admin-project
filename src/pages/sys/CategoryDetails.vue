<template>
  <div class="categoryDetails">
    <el-button size="small" type="text" @click="backHandler">返回</el-button>

  </div>
</template>
<script>
export default {

  created() {

  },
  methods: {
    // 返回
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
