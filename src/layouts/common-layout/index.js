import { Layout, Menu, Icon, Badge, Avatar } from 'antd'
import s from './index.less'
import cn from 'classnames'
import Link from 'umi/link';
import { connect } from 'react-redux'
import { changeSiderCollapsed } from './redux/actions'

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
    name: '待规划',
    icon: 'block',
    path: '/backlog'
  }
]

const CommonLayout = ({ children, collapsed, handleCollapsed }) => {
  const renderMenus = () => {
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

  return (
    <Layout className={cn(collapsed && s.appCollapsed)}>
      <Sider className={s.sider} width={256} collapsed={collapsed}>
        <div className={s.logo}>PMS</div>
        {renderMenus()}
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
            <div className={s.headerAvatar}>
              <Avatar>J</Avatar>
              <span className={s.headerAvatarName}>jason</span>
            </div>
          </div>
        </Header>
        <Content className={s.body}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default connect(
  store => ({ collapsed: store.commonLayoutReducer.collapsed }),
  dispatch => ({ handleCollapsed: collapsed => dispatch(changeSiderCollapsed(collapsed))})
)(CommonLayout)
