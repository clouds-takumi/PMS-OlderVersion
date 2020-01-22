import s from './index.less'

export default function({children}) {
  return (
    <div className={s.login}>
      {children}
    </div>
  )
}
