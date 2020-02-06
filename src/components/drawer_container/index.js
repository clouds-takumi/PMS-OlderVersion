import { PureComponent } from 'react'
import { Drawer, Icon, Dropdown, Menu } from 'antd'
import router from 'umi/router'
import s from './index.less'

class DrawContainer extends PureComponent {
    state = {
        detailData: {},
        titleValue: '',
        expandProp: true,
        expandDesc: true
    }

    handleInput = (e) => {
        let value = e.target.value
        this.setState({ titleValue: value })
        if (!!value) {
            // TODO4：value不为空允许提交修改，或者添加value为空时的提示
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

    // goback = () => this.props.closeDrawer()
    goback = () => router.push('/backlog')

    changeProp = () => this.setState((state) => {
        return { expandProp: !state.expandProp }
    })

    chageDesc = () => this.setState((state) => {
        return { expandDesc: !state.expandDesc }
    })

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
        this.setState({ detailData: resData, titleValue: resData.name })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            // 重新获取数据
            const detailId = this.props.id
            const resData =
            {
                id: detailId,
                name: '该需求的名称',
                createAuthor: 'Jane',
                createTime: '2020/12/12'
            }
            this.setState({ detailData: resData, titleValue: resData.name })
        }
    }

    render() {
        const { detailData, titleValue, expandProp, expandDesc } = this.state
        const { type } = this.props
        // Project Iteration Issues Item
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
                                                <Icon type="filter" theme="twoTone" />&nbsp;#{detailData.id}
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
                                <div className={s.partTitle}>
                                    属性
                                        <Icon
                                        type={expandProp ? 'down' : 'right'}
                                        className={s.expandIcon}
                                        style={!expandProp ? { color: "#3385ff" } : null}
                                        onClick={this.changeProp}
                                        size='small' />
                                </div>
                                {
                                    expandProp && (
                                        <div> asd </div>
                                    )
                                }
                                <div className={s.partTwo}>
                                    <div className={s.partTitle}>
                                        描述
                                        <Icon
                                            type={expandDesc ? 'down' : 'right'}
                                            className={s.expandIcon}
                                            style={!expandDesc ? { color: "#3385ff" } : null}
                                            onClick={this.chageDesc}
                                            size='small' />
                                    </div>
                                    {
                                        expandDesc && 'das'
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default DrawContainer