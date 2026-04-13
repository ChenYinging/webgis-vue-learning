<!-- 根组件：侧边栏 + 右侧内容区 -->
<template>
  <div id="app">
    <Sidebar />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  components: { Sidebar }
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Microsoft YaHei", sans-serif; background: #f0f0f0; color: #333; }
#app { display: flex; min-height: 100vh; }
.main { flex: 1; margin-left: 180px; padding: 24px; }
</style>
