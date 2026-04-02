<template>
  <div id="app">
  <BaseSelect :cityId="selectId" @changeCity="selectId = $event"></BaseSelect>
  </div>
</template>

<script>
import BaseSelect from './components/BaseSelect.vue';

export default {
  name: 'App',
  components: {
    BaseSelect
  },
  data(){
    return{
      selectId: '102'
    }
  }
}
</script>

<style>
</style>
