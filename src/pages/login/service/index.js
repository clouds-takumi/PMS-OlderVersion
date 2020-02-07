import ajax from '../../../services/ajax'

export const login = params => ajax({
  url: '/login',
  method: 'post',
  data: params,
})
