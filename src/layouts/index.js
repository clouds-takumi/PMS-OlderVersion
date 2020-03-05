import LoginLayout from './login-layout'
import CommonLayout from './common-layout'
import UserLayout from './user-layout'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function ({ location: { pathname }, children }) {

  if (pathname === '/login' || pathname === '/register') {
    return <LoginLayout>{children}</LoginLayout>
  }

  if (pathname.indexOf('/user') === 0 || pathname === '/') {
    return (
      <Provider store={store}>
        <UserLayout>{children}</UserLayout>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <CommonLayout>{children}</CommonLayout>
    </Provider>
  )
}
