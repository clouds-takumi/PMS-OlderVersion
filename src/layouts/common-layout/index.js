import { Component } from 'react'
import menus from './menus.config'
import { Layout, Menu, Icon, Badge, Avatar, Dropdown } from 'antd'
import s from './index.less'
import cn from 'classnames'
import Link from 'umi/link';
import { connect } from 'react-redux'
import { changeSiderCollapsed, setUserInfo } from './redux/actions'
import { getUserInfo } from './service'
import router from 'umi/router'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

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

  renderMenus = menus => {
    const selectedKey = this.props.children.props.location.pathname
    return menus.map(menu => {
      if (menu.children) {
        let selectedObj = menu.children.find(item => item.path === selectedKey)
        if (selectedObj) {
          this.openKey = menu.path
          console.log(this.openKey)
        }
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span className="nav-text">{menu.name}</span>
              </span>
            }>
            {
              this.renderMenus(menu.children)
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={menu.path} >
            <Link to={menu.path}>
              {menu.icon && <Icon type={menu.icon} />}
              <span className="nav-text">{menu.name}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/login')
  }

  render() {
    const { children, collapsed, handleCollapsed, userInfo } = this.props
    const selectedKey = this.props.children.props.location.pathname
    return (
      <Layout className={cn(collapsed && s.appCollapsed)}>

        <Sider className={s.sider} width={256} collapsed={collapsed}>
          <div className={s.logo}>PMS</div>
          <Menu
            mode='inline'
            theme='dark'
            defaultOpenKeys={[this.openKey]}
            defaultSelectedKeys={[selectedKey]}
          >
            {
              this.renderMenus(menus)
            }
          </Menu>
        </Sider>

        <Layout className={s.wrapper}>
          <Header className={s.header}>
            <div className={s.headerLeft} onClick={() => handleCollapsed(!collapsed)}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={s.headerRight}>
              {/* <div className={s.headerBadge}>
                <Badge count={5}>
                  <Icon type='bell' />
                </Badge>
              </div> */}
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
