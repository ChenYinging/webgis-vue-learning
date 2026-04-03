<template>
  <div id="app">
    <MyDialog>
      <template  v-slot:head>
        <div>我是大标题</div>
      </template>

     <template  #content>
        <div>内容</div>
     </template>
    
      <template  #footer>
        <button>确认</button>
        <button>取消</button>
      </template>
      </MyDialog>

      <MyDialog>
        
      </MyDialog>
  </div>
</template>

<script>
import MyDialog from './components/MyDialog.vue';

export default {
  components: {
    MyDialog
  }
}
</script>

<style>
body {
  background-color: rgb(161, 161, 161);
  margin-top: 60px;
}
</style>
