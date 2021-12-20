<template>
  <div id="home">
<!--    container布局-->
    <el-container class="home_container">
<!--      头部-->
      <el-header>
<!--        头部左侧logo和名称-->
        <div class="header_left">
          <img src="../assets/img/logo_container.png" alt="logo">
          <span>石化机械故障智能诊断系统</span>
        </div>
<!--        头部右侧退出按钮-->
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
<!--      左侧导航栏-->
      <el-container>
        <el-aside width="200px">
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router>
<!--              个人信息导航按钮区域-->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                  <el-menu-item index="/home/profile">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>个人信息</span>
                    </template>
                  </el-menu-item>
              </el-submenu>
<!--              机组导航栏按钮区域-->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>机组管理</span>
                </template>
                <el-menu-item index="/home/machine">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>机组信息</span>
                  </template>
                </el-menu-item>
              </el-submenu>
<!--              传感器导航栏按钮区域-->
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>传感器管理</span>
                </template>
                <el-menu-item index="/home/sensor">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>传感器信息</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created() {
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods:{
    logout() {
      // 清除token值
      window.sessionStorage.clear()
      // 跳转到登录页面
      this.$router.push('/login')
      this.$message.success('已退出登录')
    }
  }
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
