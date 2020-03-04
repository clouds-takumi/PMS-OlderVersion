import ajax from '../../../services/ajax'

export const reqAllProjects = () => ajax({
    method: 'get',
    url: '/projects'
}, true)

export const reqIters = page => ajax({
    method: 'get',
    url: '/iterations',
    params: { page }
}, true)

export const reqIdIter = id => ajax({
    method: 'get',
    url: `/iteration/${id}`
}, true)

export const addIter = data => ajax({
    method: 'post',
    url: '/iteration',
    data
}, true)

export const delIdIter = id => ajax({
    method: 'delete',
    url: `/iteration/${id}`
}, true)

export const updateIdIter = (id, data) => ajax({
    method: 'put',
    url: `/iteration/${id}`,
    data
}, true)

export const reqUserInfo = () => ajax({
    method: 'get',
    url: '/userInfo'
}, true)
