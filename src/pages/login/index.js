import { Form, Input, Button, Icon } from 'antd'
import s from './index.less'
import { useState } from 'react'
import { login } from './service'
import router from 'umi/router'
import Link from 'umi/link'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const toLogin = () => {
    login({ username, password }).then(data => {
      if (data) {
        localStorage.setItem('token', data.token)
        router.replace('/user')
      }
    })
  }

  return (
    <div className={s.login}>
      <div className={s.loginLine}>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='用户名'
          value={username}
          onChange={handleUsernameChange} />
      </div>
      <div className={s.loginLine}>
        <Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type='password'
          placeholder='密码'
          value={password}
          onChange={handlePasswordChange} />
      </div>
      <Button
        className={s.loginButton}
        type='primary'
        onClick={toLogin}>登录</Button>
      <div className={s.textLine}>
        还没有帐号?<Link to='/register'>去注册</Link>
      </div>
    </div>
  )
}

export default Login
