import axios from 'axios'
import { Message } from 'element-ui'
import Storage from 'good-storage'
import router from '@/router/index'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = Storage.get('webToken')
    if (token) {
      config.params = { ...config.params, token }
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 401 || res.code === 403) {
        if (Storage.get('loginIsSso')) {
          // 判断是否是统一门户过来的
          window.location.href = `${process.env.VUE_APP_SSO_URL}/login`
        } else {
          router.push({ name: 'login' })
        }
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    console.log(`err${error}`) // for debug
    if (error.message.includes('timeout')) {
      Message({ message: '请求超时，请重试', type: 'error', duration: 5 * 1000 })
    } else if (error.message.includes('Network Error')) {
      Message({ message: '网络不可用，请检查你的网络设置', type: 'error', duration: 5 * 1000 })
    } else {
      Message({ message: error.message, type: 'error', duration: 5 * 1000 })
    }
    return Promise.reject(error)
  }
)

export default service
