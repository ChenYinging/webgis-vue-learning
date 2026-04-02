<template>
  <div id="app">
  <!-- <BaseSelect :cityId="selectId" @changeCity="selectId = $event"></BaseSelect> -->
  <!-- <BaseSelect :value="selectId" @input="selectId = $event"></BaseSelect> -->
  <BaseSelect v-model="selectId"></BaseSelect>
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
      selectId: '103'
    }
  }
}
</script>

<style>
</style>
