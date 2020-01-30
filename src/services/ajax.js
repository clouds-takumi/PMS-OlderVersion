import axios from 'axios'
// import store from '../utils/storage'

// axios.interceptors.request.use(
//     (config) => {
//         if(!store.user.isLogin)
//         return config
//     },
//     (error) => { return Promise.reject(error) }
// )

axios.interceptors.response.use(
    response => { return response.data },
    error => { return Promise.reject(error) }
)

export default axios