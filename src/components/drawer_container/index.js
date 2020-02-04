import { PureComponent } from 'react'
import { Drawer, Icon, Dropdown, Menu } from 'antd'
import s from './index.less'

class DrawContainer extends PureComponent {
    state = {
        detailData: {},
        titleValue: ''
    }

    handleInput = (e) => {
        let value = e.target.value
        if (!!value) {
            this.setState({ titleValue: value })
        }
    }

    deleteItem = () => {
        // TODO2：删除该id详情
        alert('确认删除吗？')
    }

    renderDropDownMenu = () => {
        return (
            <Menu>
                <Menu.Item key='0' onClick={this.deleteItem}>删除</Menu.Item>
            </Menu>
        )
    }

    goback = () => {
        this.props.closeDrawer()
    }

    componentDidMount() {
        const detailId = this.props.id
        const resData =
        {
            id: detailId,
            name: '该需求的名称',
            createAuthor: 'Jane',
            createTime: '2020/12/12'
        }
        // TODO1:根据id获取数据
        this.setState({ detailData: resData })
        this.setState({ titleValue: resData.name })
    }

    render() {
        const { detailData, titleValue } = this.state
        return (
            <div className={s.drawerRoot}>
                <Drawer
                    title=""
                    placement="right"
                    closable={false}
                    onClose={this.props.closeDrawer}
                    visible={this.props.visible}
                    width='700px'
                    mask={false}
                >
                    <div className={s.root}>
                        <div type="close-circle" theme="twoTone" onClick={this.goback} className={s.closeBtn}></div>
                        <div className={s.detailRoot}>
                            <div className={s.detailHeaderWrapper}>
                                <div className={s.detailHeader}>
                                    <div className={s.detailMenu}>
                                        <div className={s.detailId}>
                                            <span className={s.code}>
                                                {/* TODO3：this.props.id 换成 detailData.id 达不到点击其他iem，此处切换对象显示的效果 */}
                                                <Icon type="filter" theme="twoTone" />&nbsp;#{this.props.id}
                                            </span>
                                            <span></span>
                                        </div>
                                        <div className={s.detailOpe}>
                                            <div></div>
                                            <div></div>
                                            <div className={s.trigger}>
                                                <Dropdown overlay={this.renderDropDownMenu()} trigger={['click']}>
                                                    <Icon type='ellipsis' onClick={e => e.stopPropagation()} />
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={s.titleContainer}>
                                        <input
                                            type='text'
                                            value={titleValue}
                                            onChange={this.handleInput}
                                            className={s.titleInput} />
                                    </div>
                                    <div className={s.briefInfo}>
                                        <div className={s.info}>
                                            <div className={s.infoCreate}>该需求属于的项目</div>
                                            <div className={s.infoAss}>该需求属于的迭代</div>
                                        </div>
                                        <div className={s.tim}>{detailData.createAuthor} 创建于 {detailData.createTime}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.detailBody}>
                                <div>属性-需求的截至日期 / 预估时间 </div>
                                <div>描述-编辑</div>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>

        )
    }
}

export default DrawContainer