<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserList } from '../utils/mockData.js'

const router = useRouter()

// 搜索关键词
const searchKeyword = ref('')
// 加载状态
const isLoading = ref(false)
// 列表数据
const listData = ref([])
// 分页参数
const pageParams = ref({
  pageNum: 1,
  pageSize: 3
})
// 总条数
const total = ref(0)

// 获取列表数据
function fetchList() {
  isLoading.value = true
  const result = getUserList(
    pageParams.value.pageNum,
    pageParams.value.pageSize,
    searchKeyword.value
  )
  listData.value = result.list
  total.value = result.total
  isLoading.value = false
}

// 搜索
function handleSearch() {
  pageParams.value.pageNum = 1
  fetchList()
}

// 分页：切换每页条数
function handlePageSizeChange(size) {
  pageParams.value.pageSize = size
  pageParams.value.pageNum = 1
  fetchList()
}

// 分页：切换页码
function handlePageNumChange(num) {
  pageParams.value.pageNum = num
  fetchList()
}

// 查看详情
function handleDetail(row) {
  router.push(`/user/detail/${row.id}`)
}

// 初始化
onMounted(() => {
  fetchList()
})
</script>

<template>
  <div class="list-page">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="请输入用户名/真实姓名搜索"
        class="search-input"
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" class="search-btn" @click="handleSearch">
        搜索
      </el-button>
    </div>

    <!-- 列表表格 -->
    <el-table
      :data="listData"
      border
      stripe
      class="user-table"
      v-loading="isLoading"
    >
      <el-table-column label="序号" type="index" align="center" width="80" />
      <el-table-column label="用户名" prop="username" align="center" />
      <el-table-column label="真实姓名" prop="realName" align="center" />
      <el-table-column label="性别" prop="gender" align="center" width="80" />
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="状态" align="center" width="100">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" />
      <el-table-column label="操作" align="center" width="120">
        <template #default="scope">
          <el-button type="text" class="detail-btn" @click="handleDetail(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      class="pagination"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumChange"
      :current-page="pageParams.pageNum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="pageParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<style scoped>
.list-page {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.search-input {
  width: 300px;
}

.user-table {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
