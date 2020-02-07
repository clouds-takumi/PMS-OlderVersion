import ajax from '../../../services/ajax'

export const getUserInfo = () => ajax({
  url: '/userInfo',
}, true)
