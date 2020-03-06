import { PureComponent } from 'react'
import s from './index.less'
import { Drawer, Icon, Dropdown, Menu, message } from 'antd'

class DrawContainer extends PureComponent {
    state = {
        detailData: {},
        titleValue: '',
        expandProp: true,
        expandDesc: true,
        editFlag: true
    }

    handleInput = e => this.setState({ titleValue: e.target.value })

    updateData = () => {
        // data id 
    }

    deleteItem = () => {
        const { id } = this.state.detailData
        let c = window.confirm('确认删除吗?')
        if (c) {
            this.props.delOperation(id)
            message.success('删除成功')
        }
    }

    goback = () => this.props.closeDrawer()

    changeProp = () => this.setState((state) => {
        return { expandProp: !state.expandProp }
    })

    chageDesc = () => this.setState((state) => {
        return { expandDesc: !state.expandDesc }
    })

    componentDidMount() {
        const { data } = this.props
        this.setState({ titleValue: data.name, detailData: data })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            const { data } = this.props
            this.setState({ titleValue: data.name, detailData: data })
        }
    }

    renderDropDownMenu = () => {
        return (
            <Menu>
                <Menu.Item key='0' onClick={this.deleteItem} style={{ color: 'red' }}>删除</Menu.Item>
            </Menu >
        )
    }

    renderItemDetail = () => {
        const { expandProp, expandDesc, editFlag } = this.state
        return (
            <>
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
                            <div>
                                <div>截止日期</div>
                            </div>
                        )
                    }
                    <div className={s.partTwo}>
                        <div className={s.partTitle}>
                            <span>描述</span>
                            <Icon
                                type={expandDesc ? 'down' : 'right'}
                                className={s.expandIcon}
                                style={!expandDesc ? { color: "#3385ff" } : null}
                                onClick={this.chageDesc}
                                size='small' />
                            <span className={s.divid} ></span>
                            {
                                editFlag && (
                                    <span className={s.edit} onClick={() => this.setState({ editFlag: false })}>
                                        <Icon type='edit' className={s.editIcon} />
                                        <span>编辑</span>
                                    </span>)
                            }
                        </div>
                        {
                            expandDesc && (
                                <>
                                    {
                                        editFlag
                                            ? (<div>没有描述</div>)
                                            : (<div>有描述</div>)
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }

    renderHeader = () => {
        const { detailData, titleValue } = this.state
        const { id, name, desc, assignee, startDate, endDate, createdAt, updatedAt, projectId } = detailData
        return (
            <>
                <div className={s.detailHeaderWrapper}>
                    <div className={s.detailHeader}>
                        <div className={s.detailMenu}>
                            <div className={s.detailId}>
                                <span className={s.code}>
                                    <Icon type="filter" theme="twoTone" />&nbsp;#{id}
                                </span>
                                <span></span>
                            </div>
                            <div className={s.detailOpe}>
                                <div></div>
                                <div></div>
                                {
                                    <div className={s.trigger}>
                                        <Dropdown overlay={this.renderDropDownMenu()} trigger={['click']}>
                                            <Icon type='ellipsis' onClick={e => e.stopPropagation()} style={{ color: 'blue', fontSize: '16px' }} />
                                        </Dropdown>
                                    </div>
                                }
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
                                <div className={s.infoCreate}>
                                    --{projectId}
                                </div>
                                <div className={s.infoAss}>
                                    --{assignee}
                                </div>
                            </div>
                            <div className={s.tim}>{detailData.created}_(创建人id) 创建于 {}</div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    render() {
        const { visible, closeDrawer } = this.props
        return (
            <div className={s.drawerRoot}>
                <Drawer
                    title=""
                    placement="right"
                    closable={false}
                    onClose={closeDrawer}
                    visible={visible}
                    width='700px'
                    mask={false}
                >
                    <div className={s.root}>
                        <div onClick={this.goback} className={s.closeBtn}></div>

                        <div className={s.detailRoot}>
                            {
                                this.renderHeader()
                            }

                            {
                                this.renderItemDetail()
                            }
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default DrawContainer