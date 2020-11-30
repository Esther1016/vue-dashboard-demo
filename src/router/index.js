import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',  //若進入不存在的頁面,則進入login
      redirect:'login'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
