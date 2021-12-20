import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home'),
    children:[
      { path:'/', redirect:'welcome'},
      { path:'welcome',name:'Welcome',component:() => import('../components/Welcome') },
      { path:'profile',name:'Profile',component:() => import('../components/Profile') },
      { path:'machine',name:'Machine',component:() => import('../components/Machine') },
      { path:'sensor',name:'Sensor',component:() => import('../components/Sensor') }
    ]
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path:'/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  {
    path:'/admin',
    name: 'Admin',
    component: () => import('../views/Admin'),
    children:[
      { path:'/', redirect:'welcome'},
      { path:'welcome',name:'Welcome',component:() => import('../components/Welcome') },
      { path:'user',name:'User',component:() => import('../components/User') },
      { path:'result',name:'Result',component:() => import('../components/Result') },
      { path:'select',name:'Select',component:() => import('../components/Select') }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加beforeEach导航守卫
router.beforeEach((to, from ,next) => {
  // 如果用户访问登录页面，直接放行
  if(to.path === '/login') return next()
  // 获取登录后的token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果token不存在，则强制跳转到登录页面
  if(!tokenStr) return next('/login')
  next()
})

export default router
