<script setup>
</script>

<template>
  <div class="home-page">
    <el-card class="home-card">
      <template #header>
        <span class="card-title">欢迎使用</span>
      </template>
      <div class="welcome-text">欢迎进入后台管理系统</div>
    </el-card>
  </div>
</template>

<style scoped>
.home-page {
  padding: 20px;
}

.home-card {
  max-width: 600px;
  margin: 0 auto;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
}

.welcome-text {
  font-size: 16px;
  color: #666;
  text-align: center;
  padding: 20px 0;
}
</style>
