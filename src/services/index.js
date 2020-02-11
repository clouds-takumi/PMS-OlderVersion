import ajax from './ajax'

export const reqProjects = () => ajax({
    method: 'get',
    url: '/projects'
}, true)

export const reqIdProject = id => ajax({
    method: 'get',
    url: `/project/:${id}`
}, true)

export const addProject = data => ajax({
    method: 'post',
    url: '/project',
    data
}, true)

export const delIdProject = id => ajax({
    method: 'delete',
    url: `/project/:${id}`
}, true)

export const updataIdProject = id => ajax({
    method: 'put',
    url: `/project/:${id}`
}, true)