<template>
  <div id="nav">
    <vue-particles
            color="#555"
            :particleOpacity="0.7"
            :particlesNumber="150"
            shapeType="circle"
            :particleSize="4"
            linesColor="#555"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="false"
            clickMode="push"
            class="lizi"
    />
    <div class="login_box">
      <div class="logo_box">
<!--        头像区域-->
        <img src="../assets/img/logo.png" alt="logo">
      </div>
      <!--        登录表单区域-->
      <el-form label-width="80px" ref="loginRef" :model="loginModel" :rules="loginRules" class="login_form">
        <el-form-item label="账号" prop="username">
          <el-input prefix-icon="el-icon-search" v-model="loginModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-search" v-model="loginModel.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
        <el-radio v-model="loginModel.role" label="admin">管理员</el-radio>
        <el-radio v-model="loginModel.role" label="common">测试员</el-radio>
        </el-form-item>
<!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
        <el-link type="primary" class="jump" @click="jump_register">还没有账号？点击注册</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
  import  qs from 'qs'
  // import axios from 'axios'
  export default {
    name: "login",
    data() {
     return{
       // 登录对象双向绑定内容
       loginModel:{
         username:'chaichai01',
         password:'123456',
         role: 'common'
       },
       // 登录表单验证规则对象
       loginRules:{
         username:[
           { required: true, message: '账号不能为空', trigger: 'blur' },
           { min: 3, max: 10, message: '账号长度在3到10个字符之间', trigger: 'blur' }
         ],
         password:[
           { required: true, message: '密码不能为空', trigger: 'blur' },
           { min: 3, max: 10, message: '密码长度在3到10个字符之间', trigger: 'blur' }
         ]
       }
     }
    },
    methods: {
      // 点击重置登录内容
      resetLogin() {
        this.$refs.loginRef.resetFields();
      },
      login() {
        this.$refs.loginRef.validate(async valid => {
          if(valid){
            const result = await this.$axios.post('/ifdsforpm/user/login', qs.stringify(this.loginModel))
            // console.log(this.loginModel);
            // console.log(result.data);
            if(result.data.msg === "admin"){
              this.$message.success('登录成功！')
              // 前端自定义保存一个token
              window.sessionStorage.setItem("token", 'login success')
              // 管理员账号验证成功，跳转到管理员页面
              this.$router.push('/admin')
            }else if(result.data.msg === "common"){
              this.$message.success('登录成功！')
              // 前端自定义保存一个token
              window.sessionStorage.setItem("token", 'login success')
              window.sessionStorage.setItem("usernameP", this.loginModel.username)
              // 测试员账号验证成功，跳转到测试员页面
              this.$router.push('/home')
              // this.$router.push({
              //   path:'/home',
              //   query:{
              //     usernameParam:this.loginModel.username
              //   }
              // })
            }else{
              this.$message.error('登录失败,用户名或者密码错误！')
            }
          }else{
            return;
          }
        })
      },
      jump_register() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
    width: 100%;
    background-color: rgb(239, 239, 239);
  }
  .lizi {
    position:fixed;
    top:0;
    width:100%;
  }
  .login_box {
    width: 450px;
    height: 350px;
    background: #e5e9f2;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .logo_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e5e9f2;
  }
  .logo_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: -15px;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .jump {
    width: 145px;
    margin-left: 260px;
    margin-top: -20px;
  }
</style>