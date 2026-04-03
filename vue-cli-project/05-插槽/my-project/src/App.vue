<template>
  <div id="app">
    <MyDialog>
      你确认要删除吗？
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
