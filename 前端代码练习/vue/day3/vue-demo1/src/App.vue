<template>
  <div class="App">
    <WebHeader></WebHeader>
    <WebMain></WebMain>
    <WebFooter></WebFooter>
  </div>
</template>

<script>
import WebHeader from './components/WebHeader.vue';
import WebMain from './components/WebMain.vue';
import WebFooter from './components/WebFooter.vue';

export default {
  components:{
    WebHeader: WebHeader,
    WebMain:WebMain,
      WebFooter:  WebFooter
  }
}
</script>

<style>
.App{
  width: 600px;
  height: 700px;
  background-color: #87ceeb;
  margin: auto;
  padding: 20px;
}
</style>
