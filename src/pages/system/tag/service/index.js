import ajax from '../../../../services/ajax'

export const reqTags = () => ajax({
    method: 'get',
    url: '/tags'
}, true)

export const reqIdTag = id => ajax({
    method: 'get',
    url: `/tag/:${id}`
}, true)

export const addTag = data => ajax({
    method: 'post',
    url: '/tag',
    data
}, true)

export const delIdTag = id => ajax({
    method: 'delete',
    url: `/tag/${id}`
}, true)

export const updataIdTag = (id, data) => ajax({
    method: 'put',
    url: `/tag/${id}`,
    data
}, true)

