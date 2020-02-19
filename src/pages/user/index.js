import { Component } from 'react'
import s from './index.less'
import router from 'umi/router'

class User extends Component {
  state = {}

  changeRoute = () => {
    router.replace('/user/projects')
  }

  render() {
    return (
      <div className={s.userRoot}>

        <div className={s.projects}>
          <div className={s.titleContainer}><h3>我的项目</h3></div>
          <div className={s.projectsList}>
            <div>pro1---</div>
            <div>pro2---</div>
          </div>
        </div>

        <div className={s.work}>
          <div className={s.titleContainer}>
            <h3>工作台</h3>
            <div className={s.switch}>项目动态 / 我的事项 /</div>
            <div className={s.divider}></div>
            <div className={s.select}>全部项目</div>
            <span className={s.extendBtn}></span>
          </div>

          <div className={s.workContent}>
            <div>tab container</div>
            <div>tab wrapper</div>
          </div>
        </div>
      </div>
    );
  }
}

export default User