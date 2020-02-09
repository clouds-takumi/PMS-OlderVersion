import { Component } from 'react'
import { Layout, Menu, Icon, Badge, Avatar, Dropdown } from 'antd'
import s from './index.less'
import cn from 'classnames'
import Link from 'umi/link';
import { connect } from 'react-redux'
import { changeSiderCollapsed, setUserInfo } from './redux/actions'
import { getUserInfo } from './service'
import router from 'umi/router'

const { Header, Content, Sider } = Layout

const menus = [
  {
    id: 1,
    name: '首页',
    icon: 'home',
    path:'/'
  },
  {
    id: 2,
    name: '项目',
    icon: 'project',
    path:'/project'
  },
  {
    id: 3,
    name: '迭代',
    icon: 'build',
    path:'/iteration'
  },
  {
    id: 4,
    name: '待规划',
    icon: 'block',
    path: '/backlog'
  },
  {
    id: 5,
    name: '事项',
    icon: 'filter',
    path: '/issues'
  },
  {
    id: 6,
    name: '系统',
    icon: 'setting',
    path: '/system',
    children: [
      {
        id: '6-1',
        name: '标签管理',
        path: '/system/tag'
      },
      {
        id: '6-2',
        name: '用户管理',
        path: '/system/user'
      }
    ]
  }
]

class CommonLayout extends Component {
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
  renderMenus = () => {
    return (
      <Menu
        theme='dark'
        mode='inline'>
        {
          menus.map(menu => (
            <Menu.Item key={menu.id} >
              <Link to={menu.path}>
                <Icon type={menu.icon} />
                <span className="nav-text">{menu.name}</span>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    )
  }
  handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/login')
  }
  render() {
    const { children, collapsed, handleCollapsed, userInfo } = this.props

    return (
      <Layout className={cn(collapsed && s.appCollapsed)}>
        <Sider className={s.sider} width={256} collapsed={collapsed}>
          <div className={s.logo}>PMS</div>
          {this.renderMenus()}
        </Sider>
        <Layout className={s.wrapper}>
          <Header className={s.header}>
            <div className={s.headerLeft} onClick={() => handleCollapsed(!collapsed)}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={s.headerRight}>
              <div className={s.headerBadge}>
                <Badge count={5}>
                  <Icon type='bell' />
                </Badge>
              </div>
              {
                userInfo && (
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item onClick={this.handleLogout}>退出登录</Menu.Item>
                    </Menu>
                  }>
                    <div className={s.headerAvatar}>
                      <Avatar>{userInfo.username[0]}</Avatar>
                      <span className={s.headerAvatarName}>{userInfo.username}</span>
                    </div>
                  </Dropdown>
                )
              }
            </div>
          </Header>
          <Content className={s.body}>{children}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  store => ({
    collapsed: store.commonLayoutReducer.collapsed,
    userInfo: store.commonLayoutReducer.userInfo,
  }),
  dispatch => ({
    handleCollapsed: collapsed => dispatch(changeSiderCollapsed(collapsed)),
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
  })
)(CommonLayout)
