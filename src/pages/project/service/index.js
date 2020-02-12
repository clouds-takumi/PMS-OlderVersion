import ajax from '../../../services/ajax'

export const reqUserInfo = () => ajax({
    method: 'get',
    url: '/userInfo'
}, true)

export const reqTags = () => ajax({
    method: 'get',
    url: '/tags'
}, true)

export const reqProjects = () => ajax({
    method: 'get',
    url: '/projects'
}, true)

export const reqIdProject = id => ajax({
    method: 'get',
    url: `/project/${id}`
}, true)

export const addProject = data => ajax({
    method: 'post',
    url: '/project',
    data
}, true)

export const delIdProject = id => ajax({
    method: 'delete',
    url: `/project/${id}`
}, true)

export const updataIdProject = (id, data) => ajax({
    method: 'put',
    url: `/project/${id}`,
    data
}, true)

