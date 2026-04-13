<!-- 系统设置：v-model 双向绑定 + @click 事件 -->
<template>
  <div>
    <h2>系统设置</h2>
    <div class="box">
      <p>站点名称：<input v-model="name" /></p>
      <p><label><input type="checkbox" v-model="notify" /> 启用通知</label></p>
      <button @click="save">保存</button>
      <p v-if="msg" class="tip">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '后台管理系统',
      notify: true,
      msg: ''
    }
  },
  methods: {
    save() {
      this.msg = '保存成功！'
    }
  }
}
</script>

<style scoped>
.box { background: #fff; padding: 16px; border-radius: 6px; max-width: 300px; }
p { margin-bottom: 10px; font-size: 14px; }
input[type="text"] { padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; outline: none; }
button { background: #409eff; color: #fff; border: none; padding: 6px 18px; border-radius: 4px; cursor: pointer; }
.tip { color: #67c23a; margin-top: 8px; }
</style>
