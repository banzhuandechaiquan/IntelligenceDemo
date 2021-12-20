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
    <div class="register_box">
      <div class="logo_box">
        <!--        头像区域-->
        <img src="../assets/img/logo.png" alt="logo">
      </div>
      <!--        登录表单区域-->
      <el-form label-width="80px" ref="registerRef" :model="user" :rules="RegisterRules" class="register_form">
        <el-form-item label="账号" prop="username">
          <el-input prefix-icon="el-icon-search" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-search" type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_again">
          <el-input prefix-icon="el-icon-search" type="password" v-model="user.password_again"></el-input>
        </el-form-item>
        <el-form-item label="注册角色">
          <el-radio v-model="user.role" label="admin">管理员</el-radio>
          <el-radio v-model="user.role" label="common">测试员</el-radio>
        </el-form-item>
        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="resetRegister">重置</el-button>
        </el-form-item>
        <el-link type="primary" class="jump" @click="jump_login">已有账号,点击跳转登录</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
  import qs from "qs";

  export default {
    name: "Register",
    data(){
      return{
        user:{
          username: '',
          password: '123456',
          password_again: '123456',
          role: 'common',
          firstLogin: true
        },
        RegisterRules:{
          username:[
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度在3到10个字符之间', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '密码长度在3到10个字符之间', trigger: 'blur' }
          ],
          password_again:[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '密码长度在3到10个字符之间', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      resetRegister() {
        this.$refs.registerRef.resetFields();
      },
      register() {
        this.$refs.registerRef.validate(async valid => {
          if(valid){
            const result = await this.$axios.post('/ifdsforpm/user/save', this.user)
            // console.log(this.user);
            if(this.user.password !== this.user.password_again){
              this.$message.error('两次输入的密码不一致！')
              return
            }else {
              // console.log(result.data);
              this.$message.success('注册成功，请登录！')
              this.$router.push('/login')
            }
          }else{
            return;
          }
        })
      },
      jump_login() {
        this.$router.push('/login')
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
  .register_box {
    width: 450px;
    height: 400px;
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
  .register_form {
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