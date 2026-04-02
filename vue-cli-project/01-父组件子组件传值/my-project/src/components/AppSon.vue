<template>
  <div id="son" style=" border: 5px solid rgb(55, 138, 216);width: 300px;height: 100px;font-size: 30px;">
    我是AppSon组件{{ title }}
    <button @click="handleClick">修改title</button>
  </div>
</template>

<script>
export default {
props: ['title'],
methods: {
  handleClick(){
    this.$emit('changeTitle','学习GIS')
  }
}
}
</script>

<style scoped>

</style>