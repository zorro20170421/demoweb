import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import welcome from '@/components/welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
	{
      path: '/welcome',
      name: 'welcome',
      component: welcome,
	  meta:{
        isLogin:true    // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})
