<!-- 侧边栏：router-link 生成导航链接 -->
<template>
  <div class="sidebar">
    <div class="logo">后台管理</div>
    <router-link to="/">首页</router-link>
    <router-link to="/users">用户管理</router-link>
    <router-link to="/articles">文章管理</router-link>
    <router-link to="/settings">系统设置</router-link>
  </div>
</template>

<script>
export default { name: 'Sidebar' }
</script>

<style scoped>
.sidebar { position: fixed; left: 0; top: 0; bottom: 0; width: 180px; background: #304156; }
.logo { color: #fff; text-align: center; line-height: 50px; font-size: 16px; background: #263445; }
a { display: block; padding: 12px 20px; color: #bfcbd9; text-decoration: none; font-size: 14px; }
a:hover, a.router-link-exact-active { color: #409eff; background: #263445; }
</style>
