import ajax from '../../../services/ajax'

export const reqIdProject = id => ajax({
    method: 'get',
    url: `/project/${id}`
}, true)