import ajax from '../../../services/ajax'

export const reqIters = () => ajax({
    method: 'get',
    url: '/iterations'
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

