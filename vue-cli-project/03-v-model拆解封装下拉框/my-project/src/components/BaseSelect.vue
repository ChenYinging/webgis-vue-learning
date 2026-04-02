<template>
  <div>
    <select :value="cityId" @change="handleChange">
      <option value="101">合肥</option>
      <option value="102">安庆</option>
      <option value="103">芜湖</option>
      <option value="104">宿州</option>
      <option value="105">黄山</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    cityId: String
  },
  methods: {
    handleChange(e){
      this.$.emit('changeCity', e.target.value)
    }
  }
}
</script>

<style>

</style>