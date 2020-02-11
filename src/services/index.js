import ajax from './ajax'

/**
 * projects
 */
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

/**
 * tags
 */
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

export const updataIdTag = id => ajax({
    method: 'put',
    url: `/tag/:${id}`
}, true)