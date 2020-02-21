import ajax from '../../../services/ajax'

export const reqProjects = () => ajax({
    method: 'get',
    url: '/projects'
}, true)
