import ajax from '../../../services/ajax'

export const reqProjects = () => ajax({
    method: 'get',
    url: '/projects'
}, true)

export const reqTags = () => ajax({
    method: 'get',
    url: '/tags'
}, true)

export const addProject = data => ajax({
    method: 'post',
    url: '/project',
    data
}, true)

export const reqUserInfo = () => ajax({
    method: 'get',
    url: '/userInfo'
}, true)