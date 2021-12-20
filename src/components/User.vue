<template>
  <div>
    <!--  导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  <!--  卡片区域-->
    <el-card>
      <!--      栅格化布局——搜索框与添加按钮-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="query.username" clearable @clear="clear">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addUserBtn">添加用户</el-button>
        </el-col>
      </el-row>
  <!--    管理用户列表-->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户编号" prop="userId"></el-table-column>
        <el-table-column label="用户账号" prop="userAccount"></el-table-column>
        <el-table-column label="用户姓名" prop="username"></el-table-column>
        <el-table-column label="用户密码" prop="password"></el-table-column>
        <el-table-column label="用户角色" prop="role"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
  <!--          重置密码按钮-->
            <el-tooltip class="item" effect="dark" content="重置此用户密码" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="resetPassword(scope.row.userId)"></el-button>
            </el-tooltip>
  <!--          删除用户按钮-->
            <el-tooltip class="item" effect="dark" content="删除此用户" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteUser(scope.row.userId,scope.row.role)"></el-button>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>
  <!--    底部分页区域-->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total"
                       :current-page="currentPage" :page-sizes="[1, 3, 4, 5 , 10]" :page-size="4"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>

<!--    添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
<!--      表单输入-->
      <el-form ref="addRef" :model="addForm" label-width="80px" :rules="addRules">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="addForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="userAccount">
          <el-input v-model="addForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUserItem">确 定</el-button>
        <el-button type="info" @click="resetAddForm">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import  qs from 'qs'

  export default {
    name: "User",
    created() {
      this.getUseritem()
    },
    data() {
      return{
        // 分页
        currentPage:1,
        // 用户列表
        userList:[],
        // 用户总数
        total:0,
        // 每页显示条数
        pageSize:4,
        // 检索功能传递参数数据
        query:{
          username:'',
        },
        // 添加用户对话框是否显示
        addDialogVisible:false,
        // 添加用户表单项数据
        addForm:{
          userId:'',
          userAccount:'',
          username:'',
          password:'',
          role:'common'
        },
        // 添加用户表单验证规则
        addRules:{
          // 添加用户验证规则
          userId:[
            { required: true, message: '用户ID不能为空', trigger: 'blur' }
            // { min: 3, max: 10, message: '账号长度在3到10个字符之间', trigger: 'blur' }
          ],
          userAccount:[
            { required: true, message: '用户账号不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度在3到10个字符之间', trigger: 'blur' }
          ],
          username:[
            { required: true, message: '用户姓名不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '姓名长度在3到10个字符之间', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '用户密码不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '密码长度在3到10个字符之间', trigger: 'blur' }
          ]
        },
        // 重置用户密码所提交的提交数据
        resetPasswordItem:{
          userId:'',
          password:'123456'
        }
      }
    },
    computed:{
      // 检索请求拼接
      getUrl() {
        return '?pageSize=' + this.pageSize + '&' + 'currentPage=' + this.currentPage
      }
    },
    methods:{
      // 查询用户的方法
      async getUseritem() {
        const result = await this.$axios.post('ifdsforpm/user/select'+this.getUrl, this.query)
        // console.log(result);
        this.userList = result.data.userPageBean.list
        this.total = result.data.userPageBean.totalCount
        // console.log(this.userList);
      },
      // 增加用户的方法
      addUserItem() {
        this.addDialogVisible = false
        this.$refs.addRef.validate(async valid => {
          if(!valid) return
          const result = await this.$axios.post('/ifdsforpm/user/save', this.addForm)
          // console.log(result.data);
          if (result.data.msg === '用户已存在，创建失败') return this.$message.error('用户已存在，创建失败')
          this.$message.success('创建新用户'+ this.addForm.username + '成功！')
          this.getUseritem()
        })
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        this.pageSize = newSize
        this.getUseritem()
      },
      // 监听 分页 改变的事件
      handleCurrentChange(newPage) {
        this.currentPage = newPage
        this.getUseritem()
      },
      // 点击搜索
      async search() {
        this.currentPage = 1
        this.getUseritem()
        // 根据id查询
        // const result = await this.$axios({
        //   method:'get',
        //   url:'/ifdsforpm/user/findUserById',
        //   params:{
        //       id: 100104
        //   }
        // })
        // console.log(result.data);
      },
      // 搜索框检索内容清除
      clear() {
        this.getUseritem()
      },
      // 添加用户对话框点击添加用户后显示
      addUserBtn() {
        this.addDialogVisible = true
      },
      // 重置添加用户表单数据
      resetAddForm() {
        this.$refs.addRef.resetFields();
      },
      // 根据用户id删除对应用户
      async deleteUser(userId,role) {
        // console.log(role);
        // 弹框询问用户是否删除
        const confirmResult =  await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => {
          return err
        })
        // 打印用户点击为确定或者取消
        // console.log(confirmResult);
        // 如果点击取消，则返回一个取消删除的弹框
        if(confirmResult !== 'confirm') {
          return  this.$message.info('取消删除！')
        }
        // 判断是否为管理员账号，如果是管理员账号则不能删除
        if (role === 'admin') {
          return this.$message.error('管理员账户不可删除')
        }
        await this.$axios({
          method:'get',
          url:'/ifdsforpm/user/delete',
          params:{
            userId
          }
        })
        this.$message.success('删除成功！')
        // console.log(userId);
        // 重新加载用户列表
        this.getUseritem()
        },
      // 根据用户id重置用户密码为123456
     async resetPassword(userId) {
       // 弹框询问用户是否重置密码
       const confirmResult =  await this.$confirm("此操作将用户密码重置为'123456', 是否继续?", '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).catch(err => {
         return err
       })
       // 如果点击取消，则返回一个取消删除的弹框
       if(confirmResult !== 'confirm') {
         return  this.$message.info('取消重置密码！')
       }
       // 重置密码
        this.resetPasswordItem.userId = userId
        console.log(this.resetPasswordItem)
        const result = await this.$axios.post('/ifdsforpm/user/updatePassword',qs.stringify(this.resetPasswordItem))
        // console.log(result.data)
       this.$message.success("用户密码已重置为'123456'！")
       // 重新加载用户列表
       this.getUseritem()
      }
    },
  }
</script>

<style scoped>
</style>