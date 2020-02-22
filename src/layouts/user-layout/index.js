import s from './index.less'
import Header from '../../components/header'

export default function ({ children }) {
  return (
    <div className={s.user}>
      <Header />
      {children}
    </div>
  )
}
