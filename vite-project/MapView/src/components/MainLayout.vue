<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarCollapse = false

function handleMenuClick(path) {
  router.push('/' + path)
}

const menuItems = [
  { path: 'home',      title: '首页',     icon: 'HomeFilled' },
  { path: 'user/list', title: '用户列表', icon: 'User' },
  { path: 'map',       title: '地图展示', icon: 'MapLocation' }
]
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside width='200px' class="sidebar">
      <div class="sidebar-header">
        <span class="logo-text">后台管理系统</span>
      </div>

      <el-menu
        :default-active="route.path"
        class="sidebar-menu"
        mode="vertical"
        :collapse="sidebarCollapse"
        @select="handleMenuClick"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.path"
          :index="item.path"
        >
          <el-icon class="menu-icon">
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主体区域 -->
    <el-container class="main-content">
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <span class="header-title">{{ route.meta?.title || '后台管理系统' }}</span>
        <div class="header-user">
          <el-icon><User /></el-icon>
          <span>管理员</span>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  gap: 8px;
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.sidebar-menu {
  border-right: none;
}

.menu-icon {
  margin-right: 8px;
}

.main-content {
  flex-direction: column;
  background: #f5f5f5;
}

.header {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  gap: 16px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.header-user {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
}

.content {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}
</style>
