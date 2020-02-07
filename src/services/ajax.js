import axios from 'axios'
import { message } from 'antd'
// import store from '../utils/storage'

axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => { return Promise.reject(error) }
)

axios.interceptors.response.use(
    response => {
      const { status, data } = response

      if (status === 200 && data.code !== 0) {
        message.error(data.msg)
      }

      return data.data
    },
    error => { return Promise.reject(error) }
)

export const baseUrl = 'http://localhost:7001'

export default (config, auth) => {
  const { url } = config
  config.url = `${baseUrl}${url}`

  if (auth) {
    const token = localStorage.getItem('token')
    const authHeader = {
      'Authorization': `Bearer ${token}`
    }
    const { headers } = config
    config.headers = {
      ...headers,
      ...authHeader,
    }
  }

  return axios(config)
}
