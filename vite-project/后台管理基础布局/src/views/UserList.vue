<!-- 用户列表：v-for + router-link 跳转详情 -->
<template>
  <div>
    <h2>用户管理</h2>
    <table>
      <tr><th>ID</th><th>姓名</th><th>操作</th></tr>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.id }}</td>
        <td>{{ u.name }}</td>
        <td><router-link :to="'/users/' + u.id">查看</router-link></td>
      </tr>
    </table>
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
  }
}
</script>

<style scoped>
table { background: #fff; border-radius: 6px; overflow: hidden; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
th, td { padding: 10px 16px; text-align: left; border-bottom: 1px solid #eee; font-size: 14px; }
th { background: #fafafa; color: #999; font-weight: normal; }
a { color: #409eff; text-decoration: none; }
</style>
