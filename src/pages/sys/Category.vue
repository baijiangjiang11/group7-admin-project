<template>
  <div class="category">
    <div>
      <el-row>
        <el-col :span="14">
          <!-- 按钮 -->
          <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
          <el-button type="success" size="small" @click="batchDeleteHandler">批量删除</el-button>
        </el-col>
        <!-- <el-col :span="10">
          <el-form :inline="true">
              <el-form-item>
                <el-select v-modal="categoryId" placeholder="请选择栏目id">
                <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
          </el-form>
        </el-col>    -->
      </el-row>
      <!-- <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
      <el-select size="small" /> -->
    </div>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="categories" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="name" label="栏目名称" align="center" />
        <el-table-column prop="num" label="数量" align="center" />
        <el-table-column label="栏目图标" align="center">
          <template v-slot:default="record">
            <img :src="record.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
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
          <el-select v-model="category.name" placeholder="请输入所属栏目区域">
            <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量" label-width="100px" prop="num">
          <el-input v-model="category.num" auto-complete="off" />
        </el-form-item>

        <el-form-item label="栏目图标" label-width="100px">
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
      fileList: [],
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
    ...mapActions('category', ['findAllCategories', 'deleteCategoryById', 'saveOrUpdateCategory', 'batchDeleteCategory']),
    // 普通方法

    // 上传照片
    uploadSuccessHandler(response) {
      // 获取返回值中的id，然后将id设置到列表中
      alert(response.atatus)
      if (response.status === 200) {
        const id = response.data.id
        const icon = 'http://134.175.154.93:8888/group1/' + id
        this.category.icon = icon
        this.category = Object.assign({}, this.category)
      } else {
        this.$message.error('上传异常')
      }
    },
    // 跳转到详情页面
    toDetailsHandler(category) {
      this.$router.push({
        path: '/sys/category_details',
        query: { category }

      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    // 添加按钮
    toAddHandler() {
      // 1.重置表单
      this.category = {}
      // 2.修改title
      this.setTitle('添加顾客信息')
      // 3.显示模态框
      this.showModal()
    },
    // 关闭模态框
    dialogCloseHandler() {
      this.$refs.categoryForm.resetFields()
      this.closeModal()
      this.fileList = []
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
      // 将当前行的信息绑定category
      this.category = row
      this.fileList.push({ name: 'old', url: 'row.icon' })
      this.setTitle('修改栏目信息')
      this.showModal()
    },
    batchDeleteHandler() {
      this.batchDeleteCategory(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    }
  }
}
</script>
<style scoped>

</style>
