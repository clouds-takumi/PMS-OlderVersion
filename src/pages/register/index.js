import { useState } from 'react'
import { Input, Button, message } from 'antd'
import s from './index.less'
import Link from 'umi/link'
import { register } from './service'
import router from 'umi/router'

export default function(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleRpasswordChange = e => setRpassword(e.target.value)

  const toRegister = () => {
    if (password !== rpassword) {
      message.error('两次密码输入不一致!')
      return
    }
    register({username, password}).then(data => {
      if (data) {
        message.success('注册成功')
        router.replace('/login')
      }
    })
  }

  return (
    <div className={s.login}>
      <div className={s.loginLine}>
        <Input
          placeholder='用户名'
          value={username}
          onChange={handleUsernameChange} />
      </div>
      <div className={s.loginLine}>
        <Input
          placeholder='密码'
          value={password}
          onChange={handlePasswordChange} />
      </div>
      <div className={s.loginLine}>
        <Input.Password
          placeholder='确认密码'
          value={rpassword}
          onChange={handleRpasswordChange} />
      </div>
      <Button
        className={s.loginButton}
        type='primary'
        onClick={toRegister}>登录</Button>
      <div className={s.textLine}>
        已有帐号?<Link to='/login'>去登录</Link>
      </div>
    </div>
  )
}
