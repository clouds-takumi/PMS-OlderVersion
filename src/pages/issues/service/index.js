import ajax from '../../../services/ajax'

export const reqIssues = () => ajax({
    method: 'get',
    url: '/issues'
}, true)

export const reqIdIssue = id => ajax({
    method: 'get',
    url: `/issue/${id}`
}, true)

export const addIssue = data => ajax({
    method: 'post',
    url: '/issue',
    data
}, true)

export const delIdIssue = id => ajax({
    method: 'delete',
    url: `/issue/${id}`
}, true)

export const updateIdIssue = (id, data) => ajax({
    method: 'put',
    url: `/issue/${id}`,
    data
}, true)

