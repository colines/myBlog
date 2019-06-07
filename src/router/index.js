import Vue from 'vue'
import Router from 'vue-router'
const Home       = resolve => require(['@/pages/home/Home'], resolve)
const Article    = resolve => require(['@/pages/article/Article'], resolve)
const LeaveWords = resolve => require(['@/pages/leavewords/LeaveWords'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'首页'
      },
     
    },
    {
      path:'/article',
      name:'article',
      component:Article,
      meta:{
        title:'博文'
      }
    },
    {
      path:'/guestbook',
      name:'leavewords',
      component:LeaveWords,
      meta:{
        title:'留言本'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
 })

 export default router
