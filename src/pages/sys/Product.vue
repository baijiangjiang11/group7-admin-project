<template>
  <div class="product">
    <!-- 按钮 -->

    <el-row>
      <el-col :span="15">
        <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
        <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
      </el-col>
      <el-col :span="9">
        <el-form :inline="true">
          <el-form-item>
            <el-select v-model="productId" placeholder="请选择产品id">
              <el-option v-for="p in products" :label="p.id" :value="p.id" />
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="searchHandler()">查询</el-button>
        </el-form>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="products" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="price" label=" 价格" />
        <el-table-column prop="categoryId" label="栏目id" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
            <a href="" @click.prevent="toDetailsHandler(record.row.id)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="productForm" :model="product">
        <el-form-item label="产品名称" label-width="100px" prop="name">
          <el-input v-model="product.name" auto-complete="off" />
        </el-form-item>

        <el-form-item label="价格" label-width="100px" prop="price">
          <el-input v-model="product.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="产品id" label-width="100px">
          <el-select v-model="product.categoryId" placeholder="请选择栏目id">
<<<<<<< HEAD
            <el-option v-for="c in categories" :key="c.id" :label="c.id" :value="c.id" />
=======
            <el-option v-for="c in categories" :label="c.name" :value="c.id" />
>>>>>>> 81ffe523124ff9a6e6a86acd75a96f4abd2afc10
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" label-width="100px" prop="description">
          <el-input v-model="product.description" type="textarea" :rows="2" placeholder="请输入内容" auto-complete="off" />
        </el-form-item>
        <el-form-item label="产品主图" label-width="100px">
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      product: {},
      ids: [],
      fileList: [],
      productId: '请选择'

    }
  },
  computed: {
    ...mapState('product', ['products', 'categories', 'visible', 'title', 'loading']),
    ...mapGetters('product', ['orderProduct', 'productSize'])
  },
  created() {
    this.findAllProducts()
    this.findAllCategories()
  },
  methods: {
    ...mapMutations('product', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('product', ['findAllProducts', 'searchProductById', 'findAllCategories', 'saveOrUpdateProduct', 'deleteProductById', 'batchDeleteProduct']),
    // 普通方法
    toDetailsHandler(id) {
      this.$router.push({
        path: '/sys/product_details',
        query: {
          id
        }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    uploadSuccessHandler(response) {
      // 获取返回值中的id，然后将id设置到表单product
      alert(response.status)
      if (response.status === 200) {
        const id = response.data.id
        const photo = 'http://134.175.154.93:8888/group1/' + id
        alert(photo)
        this.product.photo = photo
        console.log(photo)
      } else {
        this.$message.error('上传异常！')
      }
    },
    toAddHandler() {
      // 1. 重置表单
      this.product = {}
      this.setTitle('添加产品信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.productForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateProduct(this.product)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler(id) {
      alert(id)
    },
    editHandler(row) {
      this.product = row
      this.setTitle('修改顾客信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteProductById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteProduct(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    searchHandler() {
      this.searchProductById(this.productId)
    }

  }

}
</script>
<style scoped>

</style>
