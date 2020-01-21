import ajax from './ajax'

export const reqLogin = (username, password) => ajax({
    method: 'post',
    url: '/login',
    params: { username, password }
})