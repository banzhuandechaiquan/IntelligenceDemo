<template>
  <el-container class="home_container">
<!--    头部布局-->
    <el-header>
      <div class="header_left">
        <img src="../assets/img/logo_container.png" alt="logo">
        <span>石化机械故障智能诊断系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
<!--      左侧布局-->
      <el-aside width="200px">
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router>
<!--          用户管理一级菜单-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
<!--              二级菜单-->
              <el-menu-item index="/admin/user">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>
          </el-submenu>
<!--          机组诊断一级菜单-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>机组诊断</span>
            </template>
<!--              二级菜单-->
            <el-menu-item index="/admin/result">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>诊断结果</span>
              </template>
            </el-menu-item>
          </el-submenu>
<!--          曲线图-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>曲线图</span>
            </template>
<!--              查看数据曲线-->
            <el-menu-item index="/admin/select">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据曲线图</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      主体布局-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    data() {
      return{}
    },
    created() {
      // console.log(this.$route.params.usernameParam);
    },
    methods: {
      logout(){
        // 清除token值
        window.sessionStorage.clear()
        // 跳转到登录页面
        this.$router.push('/login')
      }
    },
  }
</script>

<style scoped>
  .home_container{
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #eeeeee;
    font-size: 24px;
  }
  .header_left {
    display: flex;
    align-items: center;
  }
  .header_left span {
    margin-left: 20px;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
