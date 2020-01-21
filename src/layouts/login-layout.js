import s from './login-layout.less'

export default function({children}) {
  return (
    <div className={s.login}>
      {children}
    </div>
  )
}
