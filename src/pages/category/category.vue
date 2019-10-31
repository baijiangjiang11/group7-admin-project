<template>
  <div class="category">
    <div>
      <!-- 按钮 -->
      <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
      <!-- 查询 -->
      <el-select size="small" />
    </div>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="categories" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="name" label="栏目名称" align="center" />
        <el-table-column prop="num" label="数量" align="center" />
        <el-table-column prop="parentId" label="父ID" align="center" />
        <el-table-column label="操作">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
            <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- /表格 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="categoryForm" :model="category">
        <el-form-item label="栏目名称" label-width="100px" prop="name">
          <el-input v-model="category.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="数量" label-width="100px" prop="num">
          <el-input v-model="category.num" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      category: {},
      ids: []
    }
  },
  computed: {
    ...mapState('category', ['categories', 'loading', 'visible', 'title'])
  },
  created() {
    this.findAllCategories()
  },
  methods: {

    // 映射
    ...mapMutations('category', ['closeModal', 'showModal', 'setTitle']),
    ...mapActions('category', ['findAllCategories', 'deleteCategoryById', 'saveOrUpdateCategory']),
    // 普通方法
    // 跳转到详情页面
    toDetailsHandler(category) {
      this.$router.push({
        path: './Details',
        query: { id: category.id }

      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    // 添加按钮
    toAddHandler() {
      // 1.重置表单
      this.customer = {}
      // 2.修改title
      this.setTitle('添加顾客信息')
      // 3.显示模态框
      this.showModal()
    },
    // 关闭模态框
    dialogCloseHandler() {
      this.$refs.categoryForm.resetFields()
      this.closeModal()
    },
    submitHandler() {
      // 校验
      this.$refs.categoryForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateCategory(this.category)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    // 为取消绑定事件
    deleteHandler(id) {
      this.deleteCategoryById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
        // 为修改按钮绑定事件
    },
    // 为修改按钮绑定事件
    editHandler(row) {
      this.category = row
      this.setTitle('修改栏目信息')
      this.showModal()
    }
  }
}
</script>
<style scoped>

</style>
