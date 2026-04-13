<!-- 用户详情：computed 计算属性 + $route.params 取参数 -->
<template>
  <div>
    <h2>用户详情</h2>
    <button @click="$router.back()">← 返回</button>
    <p v-if="user">姓名：{{ user.name }}</p>
    <p v-else>用户不存在</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
      ]
    }
  },
  computed: {
    user() {
      return this.users.find(u => u.id === Number(this.$route.params.id))
    }
  }
}
</script>

<style scoped>
button { margin: 12px 0; border: 1px solid #ddd; background: #fff; padding: 4px 12px; border-radius: 4px; cursor: pointer; }
p { background: #fff; display: inline-block; padding: 12px 18px; border-radius: 6px; }
</style>
