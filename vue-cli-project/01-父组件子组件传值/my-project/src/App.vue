<template>
  <div id="app">
    我是App组件
    <AppSon :title="myTitle" @changeTitle="handleChange"></AppSon>
  </div>
</template>

<script>
import AppSon from './components/AppSon.vue'
export default {
  name: 'App',
  components: {
    AppSon
  },
  data(){
    return{
      myTitle: '前端学习'
    }
  },
  methods: {
    handleChange(newTitle){
      this.myTitle = newTitle
    }
  }
}
</script>

<style>
#app {
 border: 5px solid rgb(0, 0, 0);
 margin: 5px 0px;
 width: 500px;
 height: 200px;
 font-size: 50px;
}
</style>
