import axios from 'axios'

// 创建Axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器（发送请求前执行）
request.interceptors.request.use(
  (config) => {
    const token = 'mock_token_123456'
    if (token) {
      // 有token则添加Authorization头
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.error('请求发送失败：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器（收到响应后执行）
request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      console.error('接口请求失败：', res.msg || '未知错误')
      return Promise.reject(res.msg || '接口请求失败')
    }
    return res.data
  },
  (error) => {
    // 响应错误处理
    console.error('响应失败，', error.message)
    return Promise.reject(error)
  }
)

// 封装GET请求方法
export function requestGet(url, params = {}) {
  return request({
    method: 'GET',
    url,
    params
  })
}

export function requestPost(url, data = {}) {
  return request({
    method: 'POST',
    url,
    data
  })
}

export default request