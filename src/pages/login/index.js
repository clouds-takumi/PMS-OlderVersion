import { Input, Button } from 'antd'
import s from './index.less'

export default function (props) {
  return (
    <div className={s.login}>
      <div className={s.loginLine}>
        <Input placeholder='用户名' />
      </div>
      <div className={s.loginLine}>
        <Input placeholder='密码' />
      </div>
      <Button className={s.loginButton} type='primary'>登录</Button>
    </div>
  )
}
