<!-- 文章列表 -->
<template>
  <div>
    <h2>文章管理</h2>
    <div class="item" v-for="a in list" :key="a.id">
      <b>{{ a.title }}</b>
      <p>{{ a.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, title: 'Vue2入门', desc: '学习Vue2基础语法。' },
        { id: 2, title: '路由配置', desc: '学会使用vue-router。' }
      ]
    }
  }
}
</script>

<style scoped>
.item { background: #fff; padding: 14px 18px; border-radius: 6px; margin-bottom: 8px; }
b { font-size: 15px; }
p { font-size: 13px; color: #666; margin-top: 4px; }
</style>
