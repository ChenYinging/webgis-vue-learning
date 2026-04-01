<template>
  <div class="App">
    <div class="box" @click="fn"></div>
  </div>
</template>

<script>
// 导出的是当前组件的配置项
export default{
  methods: {
    fn(){
      alert("Hello")
    }
  }
}
</script>

<style>
.App{
  width: 400px;
  height: 400px;
  background-color: pink;
}
.App .box{
  width: 100px;
  height: 100px;
  background-color: rgb(122, 192, 250);
}
</style>
