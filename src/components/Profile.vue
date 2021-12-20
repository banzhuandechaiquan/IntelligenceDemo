<template>
  <div id="profile">
    <!--  导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
<!--    个人信息列表-->
    <el-descriptions class="margin-top" title="个人信息" :column="1" size="medium" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="updateBtn">修改密码</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label" class="labelStyle">
          <i class="el-icon-user"></i>
          用户编号
        </template>
        {{userInfo.userId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label" class="labelStyle labelStyle">
          <i class="el-icon-user"></i>
          用户账号
        </template>
        {{userInfo.userAccount}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label" class="labelStyle">
          <i class="el-icon-user"></i>
          用户姓名
        </template>
        {{userInfo.username}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label" class="labelStyle">
          <i class="el-icon-user"></i>
          角色
        </template>
        {{userInfo.role}}
      </el-descriptions-item>
    </el-descriptions>
<!--    修改密码弹窗-->
    <el-dialog title="修改密码" :visible.sync="updateDialogVisible" width="50%">
      <!--      表单输入-->
      <el-form ref="updateRef" :model="updatePasswordForm" label-width="80px" :rules="updateRules">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" show-password v-model="updatePasswordForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passwordNew">
          <el-input type="password" show-password v-model="updatePasswordForm.passwordNew"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordNewAgain">
          <el-input type="password" show-password v-model="updatePasswordForm.passwordNewAgain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="updateDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updatePasswordItem">确 定</el-button>
        <el-button type="info" @click="resetUpdateForm">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "Profile",
    created() {
      this.getUserInfo()
    },
    data() {
      return{
        // 个人信息
        userInfo:[],
        // 修改用户密码表单
        updatePasswordForm:{
          password:'',
          passwordNew:'',
          passwordNewAgain:''
        },
        // 修改密码弹窗是否显示
        updateDialogVisible:false,
        // 添加修改密码表单验证规则
        updateRules: {
          // 添加用户验证规则
          password: [
            {required: true, message: '原密码不能为空', trigger: 'blur'}
            // { min: 3, max: 10, message: '账号长度在3到10个字符之间', trigger: 'blur' }
          ],
          passwordNew: [
            {required: true, message: '新密码不能为空', trigger: 'blur'},
            {min: 3, max: 10, message: '新密码长度在3到10个字符之间', trigger: 'blur'}
          ],
          passwordNewAgain: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {min: 3, max: 10, message: '新密码长度在3到10个字符之间', trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
      async getUserInfo() {
        const result = await this.$axios.post('/ifdsforpm/user/select',{
          username:window.sessionStorage.getItem('usernameP')
        })
        // console.log(result.data);
        this.userInfo = result.data.userPageBean.list[0]
        // console.log(this.userInfo);
      },
      // 修改密码按钮
      updateBtn () {
        this.updateDialogVisible = true
      },
      // 确定修改密码
      async updatePasswordItem() {
        // 判断新密码是否为空
        if(this.updatePasswordForm.passwordNew == '') return this.$message.error('新密码不能为空！')
        // 判断原密码是否输入正确
        if(this.updatePasswordForm.password !== this.userInfo.password) return this.$message.error('原密码错误，请重新输入！')
        // 判断两次新密码是否一致
        if(this.updatePasswordForm.passwordNew !== this.updatePasswordForm.passwordNewAgain) return this.$message.error('两次输入的新密码不一致！')
        this.updateDialogVisible = false
        const result = await this.$axios.post('/ifdsforpm/user/updatePassword',qs.stringify({
          userId:this.userInfo.userId,
          password:this.updatePasswordForm.passwordNew
        }))
        // console.log(result.data);
        // 提示修改密码成功
        this.$message.success('修改密码成功,请重新登录')
        // 清除token值
        window.sessionStorage.clear()
        // 跳转到登录页面
        this.$router.push('/login')
      },
      // 重置修改密码表单
      resetUpdateForm() {
        this.$refs.updateRef.resetFields();
        console.log('resetUpdateForm');
      }
    }
  }
</script>

<style scoped>
  .margin-top {
    width: 65%;
  }
</style>