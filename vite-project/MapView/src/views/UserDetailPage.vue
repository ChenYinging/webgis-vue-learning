<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getUserDetail } from '../utils/mockData.js'

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)
const detailData = ref(null)

function goBackToList() {
  router.push('/user/list')
}

onMounted(() => {
  isLoading.value = true
  detailData.value = getUserDetail(route.params.id) || null
  isLoading.value = false
})
</script>

<template>
  <div class="detail-page">
    <el-button type="default" class="back-btn" @click="goBackToList">
      <el-icon><ArrowLeft /></el-icon> 返回列表
    </el-button>

    <el-card class="detail-card" v-loading="isLoading">
      <template #header>
        <span>用户详情</span>
      </template>
      <el-descriptions :column="1" border v-if="detailData">
        <el-descriptions-item label="用户ID">{{ detailData.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detailData.username }}</el-descriptions-item>
        <el-descriptions-item label="真实姓名">{{ detailData.realName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ detailData.gender }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ detailData.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ detailData.email }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag type="success" v-if="detailData.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detailData.createTime }}</el-descriptions-item>
      </el-descriptions>
      <div v-else class="no-data">未找到该用户</div>
    </el-card>
  </div>
</template>

<style scoped>
.detail-page {
  padding: 20px;
}

.back-btn {
  margin-bottom: 20px;
}

.detail-card {
  max-width: 700px;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 40px 0;
}
</style>
