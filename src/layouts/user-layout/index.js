import { Component } from 'react'
import s from './index.less'
import Header from '../../components/header'
import { connect } from 'react-redux'
import { setUserInfo } from './redux/actions'
import { getUserInfo } from './service'
import router from 'umi/router'
import withRouter from 'umi/withRouter'
import { Dropdown, Avatar, Menu, Icon } from 'antd'

class UserLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/login')
  }

  componentDidMount() {
    const { setUserInfo } = this.props

    getUserInfo().then(data => {
      if (data) {
        setUserInfo(data)
      } else {
        router.replace('/login')
      }
    })
  }

  render() {
    const { children, userInfo } = this.props
    return (
      <div className={s.user}>
        <Header userInfo={userInfo} handleLogout={this.handleLogout} />
        {children}
      </div>
    );
  }
}

export default withRouter(connect(
  store => ({
    userInfo: store.commonLayoutReducer.userInfo,
  }),
  dispatch => ({
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  })
)(UserLayout))