import { createRouter, createWebHistory } from 'vue-router'
// 引入页面组件
import HomePage from '../views/HomePage.vue'
import UserListPage from '../views/UserListPage.vue'
import UserDetailPage from '../views/UserDetailPage.vue'
// 引入主布局组件
import MainLayout from '../components/MainLayout.vue'
import MapPage from '../views/MapPage.vue'

// 定义路由规则
const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
      },
      {
        path: 'user/list',
        name: 'UserList',
        component: UserListPage,
      },
      {
        path: 'user/detail/:id',
        name: 'UserDetail',
        component: UserDetailPage,
        props: true
      },
      {
        path: 'map',
        name: 'Map',
        component: MapPage
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router