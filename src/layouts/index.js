import LoginLayout from './login-layout'
import CommonLayout from './common-layout'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function({location: {pathname}, children}) {

  if (pathname === '/login' || pathname === '/register') {
    return <LoginLayout>{children}</LoginLayout>
  }

  return (
    <Provider store={store}>
      <CommonLayout>{children}</CommonLayout>
    </Provider>
  )
}
