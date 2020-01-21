import LoginLayout from './login-layout'
import CommonLayout from './common-layout'

export default function({location: {pathname}, children}) {
  console.log(pathname);
  
  if (pathname === '/login' || pathname === '/register') {
    return <LoginLayout>{children}</LoginLayout>
  }

  return <CommonLayout>{children}</CommonLayout>
}
