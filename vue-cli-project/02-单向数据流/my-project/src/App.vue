<template>
  <div id="app">
   <BaseCount :count="count" @changeCount="handleChange"></BaseCount>
  </div>
</template>

<script>
import BaseCount from './components/BaseCount.vue';

export default {
  name: 'App',
  components: {
    BaseCount
  },
  data(){
    return{
      count: 666
    }
  },
  methods: {
    handleChange(newCount){
      this.count = newCount
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
