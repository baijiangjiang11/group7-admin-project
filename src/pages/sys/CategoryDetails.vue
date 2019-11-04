<template>
  <div class="categoryDetails">
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <div class="navs">
      <h2>商品详情</h2>
      <p> <strong>栏目名称：</strong>{{ category.name }}</p>
      <p> <strong>数量：</strong>{{ category.num }}</p>
      <p> <strong>图标：</strong>
        <img :src="category.icon" alt="">
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: this.$route.query.category
    }
  },
  methods: {
    // 返回
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

.navs {
  color:rgb(112, 99, 99);
  position:absolute;
  left:40%;
  line-height: 4em;

}

</style>
