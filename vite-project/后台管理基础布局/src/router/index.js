// 路由：URL 和页面的对应关系
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import UserList from '@/views/UserList.vue'
import UserDetail from '@/views/UserDetail.vue'
import ArticleList from '@/views/ArticleList.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/users', component: UserList },
    { path: '/users/:id', component: UserDetail },
    { path: '/articles', component: ArticleList },
    { path: '/settings', component: Settings }
  ]
})
