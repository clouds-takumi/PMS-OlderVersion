import ajax from './ajax'

export const reqLogin = (username, password) => ajax({
    method: 'post',
    url: '/login',
    params: { username, password }
})

// Main容器的item列表数据获取
export const reqMainLists = () => ajax({
    method: 'get',
    url: '/api/main'
})

// Main容器创建新的item更新接口
export const resMainLists = (data) => ajax({
    method: 'post',
    url: '/api/main/redata',
    data
})

// 右边容器个数列表
export const reqClassLists = () => ajax({
    method: 'get',
    url: '/api/main/class'
})

// 右边逐个容器创建新的item更新接口
export const resClassLists = (item) => ajax({
    method: 'post',
    url: '/api/main/reclass'
})