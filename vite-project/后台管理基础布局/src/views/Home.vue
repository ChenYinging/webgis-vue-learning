<!-- 首页：v-for 循环显示数据 -->
<template>
  <div>
    <h2>首页</h2>
    <div class="card" v-for="item in list" :key="item.name">
      <b>{{ item.value }}</b>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '用户数', value: 128 },
        { name: '文章数', value: 36 }
      ]
    }
  }
}
</script>

<style scoped>
.card { background: #fff; display: inline-block; padding: 20px 30px; border-radius: 6px; margin-right: 12px; }
b { font-size: 22px; display: block; }
span { font-size: 13px; color: #999; }
</style>
