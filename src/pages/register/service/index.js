import ajax from '../../../services/ajax'

export const register = params => ajax({
  url: '/register',
  method: 'post',
  data: params,
})
