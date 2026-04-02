<template>
  <div class="base-count">
    <button @click="handleAdd">+</button>
    <span>{{ count }}</span>
    <button @click="handleSub">-</button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number
  },
  methods: {
    handleAdd(){
      this.$emit('changeCount', this.count + 1)
    },

    handleSub(){
      this.$emit('changeCount', this.count - 1)
    }
  }
}
</script>

<style>
.base-count{
  margin: 20px;
  font-size: 30px;
}
button{
  margin: 0 5px;
  width: 50px;
  height: 50px;
  font-size: 30px;
}
</style>