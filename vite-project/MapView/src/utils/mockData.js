// 模拟用户列表数据
export const userListData = [
  {
    id: 'user_01', // 用户唯一标识
    username: 'admin', // 用户名
    realName: '管理员', // 真实姓名
    gender: '女', // 性别
    phone: '13800138000', // 手机号
    email: 'admin@example.com', // 邮箱
    status: 1, // 状态：1-正常，0-禁用
    createTime: '2024-01-01 10:00:00' // 创建时间
  },
  {
    id: 'user_02',
    username: 'zhangsan',
    realName: '张三',
    gender: '男',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    status: 1,
    createTime: '2024-01-02 14:30:00'
  },
  {
    id: 'user_03',
    username: 'lisi',
    realName: '李四',
    gender: '女',
    phone: '13800138002',
    email: 'lisi@example.com',
    status: 0,
    createTime: '2024-01-03 09:15:00'
  },
  {
    id: 'user_04',
    username: 'wangwu',
    realName: '王五',
    gender: '男',
    phone: '13800138003',
    email: 'wangwu@example.com',
    status: 1,
    createTime: '2024-01-04 16:45:00'
  },
  {
    id: 'user_05',
    username: 'zhaoliu',
    realName: '赵六',
    gender: '女',
    phone: '13800138004',
    email: 'zhaoliu@example.com',
    status: 1,
    createTime: '2024-01-05 11:20:00'
  }
]

// 模拟获取用户列表（模拟接口请求，后续替换为真实axios请求）
export function getUserList(pageNum = 1, pageSize = 3, keyword = '') {
  // 模拟分页、搜索逻辑（贴合后台真实接口逻辑）
  let filteredList = userListData
  // 搜索功能：根据用户名/真实姓名模糊匹配
  if (keyword) {
    filteredList = userListData.filter(item =>
      item.username.includes(keyword) || item.realName.includes(keyword)
    )
  }
  // 分页功能：计算当前页数据
  const startIndex = (pageNum - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredList.slice(startIndex, endIndex)

  // 返回分页结果
  return {
    list: currentPageData,
    total: filteredList.length,
    pageNum,
    pageSize
  }
}

// 模拟获取用户详情（根据用户ID查询）
export function getUserDetail(id) {
  // 模拟接口根据ID查询数据
  return userListData.find(item => item.id === id) || null
}