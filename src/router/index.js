import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Article from '@/pages/article/Article'
import LeaveWords from '@/pages/leavewords/LeaveWords'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/article',
      name:'article',
      component:Article
    },
    {
      path:'/leavewords',
      name:'leavewords',
      component:LeaveWords
    }
  ]
})
