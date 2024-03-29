import { Component } from 'react'
import s from './index.less'
import { Avatar, Badge, Icon, Dropdown, Menu } from 'antd'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { userInfo, handleLogout } = this.props
        return (
            <div className={s.headerContainer}>
                <div className={s.leftWrap}>
                    <img src='../assets/coffe.png' alt='' className={s.logo} />
                    <div className={s.proName}>PMS</div>
                </div>
                <div className={s.middleContent}></div>
                <div className={s.rightWrap}>
                    <div className={s.rightZone}>
                        <div className={s.menu}>
                            <Badge>
                                <Icon type='bell' style={{ fontSize: 16 }} />
                            </Badge>
                        </div>

                        {
                            userInfo && (
                                <Dropdown
                                    trigger={['click', 'hover']}
                                    overlay={
                                        <Menu>
                                            <Menu.Item onClick={handleLogout}>
                                                <Icon type='logout' />
                                                退出登录
                                        </Menu.Item>
                                        </Menu>
                                    }>
                                    <div className={s.userInfo}>
                                        {
                                            userInfo.avatar
                                                ? <Avatar size={28} className={s.avatar} src={userInfo.avatar}/>
                                                : <Avatar size={28} >{userInfo.username}</Avatar>
                                        }
                                        <Icon type='down' className={s.headerArrow} />
                                    </div>
                                </Dropdown>

                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;