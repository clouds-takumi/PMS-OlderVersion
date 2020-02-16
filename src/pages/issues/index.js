import { PureComponent } from 'react'
import s from './index.less'
import cn from 'classnames'
import DrawContainer from '../../components/drawer_container'
import { Table, Tag, Menu, Dropdown, Icon, message, Card, Button, Modal, Input } from 'antd'
import { reqIssues, addIssue, } from './service'
import { issues, statusColorMap, statusMap, statuOptions } from './mock-data'

class Issue extends PureComponent {
    state = {
        loading: false,
        issues: [],
        id: null,
        addFlag: false,
        drawerVisible: false,
        issueName: '',
        columns: [
            {
                title: '事项名称',
                width: 120,
                key: 'name',
                render: iteration => <div style={{ cursor: 'pointer' }} onClick={() => this.showDrawer(iteration)}>{iteration.name}</div>
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 120,
                render: status => (
                    <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                        <div style={{ cursor: 'pointer' }}>
                            <Tag color={statusColorMap[status]} style={{ cursor: 'pointer' }}> {statusMap[status]}</Tag>
                            <Icon type="down" />
                        </div>
                    </Dropdown>
                )
            },
            {
                title: '处理人',
                dataIndex: 'handler',
                key: 'handler',
                width: 120,
                render: dataIndex => <div>---</div>
            },
            {
                title: '创建人',
                dataIndex: 'created',
                key: 'created',
                width: 120,
                render: dataIndex => <div>---</div>
            },
            {
                title: '创建时间',
                dataIndex: 'start_time',
                key: 'start_time',
                width: 120,
                render: dataIndex => <div>---</div>
            }
        ]
    }

    showDrawer = iteration => {
        this.setState({ drawerVisible: true, id: iteration.id })
    }

    closeDrawer = () => this.setState({ drawerVisible: false })

    showCreateModal = () => this.setState({ addFlag: true })

    closeAddModal = () => this.setState({ addFlag: false, iterName: '' })

    handleConfirm = () => {
        // 修改数据
        const data = {}
        //   const result = await updateIdIss(product, data)
        if ("result" && "result.id") {
            message.success('创建成功')
            this.fetchData()
            this.setState({ modalType: '', issueName: '' })
        }
    }

    delCurIssue = id => {
        // 删除数据 - drawer
        // delIdIter(id).then(() => {
        message.success(`删除${id}成功`)
        this.fetchData()
        this.setState({ drawerVisible: false, delFlag: false })
        // })
    }

    fetchData = () => {
        // 获取数据 
        // const resData = await reqIssues()
        if ("resData") {
            //   this.setState({ issues: resData.lists, loading: false })
            this.setState({ issues, loading: false })
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.fetchData()
    }

    rendertitle = () => (<Button type='primary' onClick={this.showCreateModal} ><Icon type='plus' />添加需求</Button>)

    renderMenu = () => {
        return (
            <Menu className={s.menu}>
                {
                    statuOptions.map(statu => (
                        <Menu.Item key={statu.key} className={s.menuItem}>
                            <span>{statu.name}</span>
                            <Icon type="double-right" className={s.arrow} />
                            <Tag color={statu.color}>{statu.event}</Tag>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }

    renderAddModal = () => {
        return (
            <Modal
                title={null}
                visible
                closable={false}
                footer={null}
                onCancel={eve => eve.stopPropagation()}>
                <div className={s.delRoot}>
                    <div className={s.title}>添加需求</div>
                    <span className={s.subtitle}>标题<span style={{ color: 'red' }}> *</span></span>
                    <Input />
                    <span className={s.subtitle}>需求描述</span>
                    <div style={{ marginTop: '30px' }}>
                        <Button onClick={this.handleConfirmDel} className={cn(s.lBtn, s.btn)}>确认</Button>
                        <Button onClick={this.closeAddModal} className={cn(s.rBtn, s.btn)}>取消</Button>
                    </div>
                </div>
            </Modal>
        )
    }

    render() {
        const { issues, columns, id, drawerVisible, addFlag } = this.state
        return (
            <div>
                <div className={s.iterRoot}>
                    <Card title={this.rendertitle()}>
                        <Table
                            className={s.table}
                            dataSource={issues}
                            columns={columns}
                            rowKey='id'
                            title={this.renderAdd}
                            pagination={{ total: 24, defaultPageSize: 8, showQuickJumper: true }} />
                    </Card>
                </div>

                {
                    addFlag && this.renderAddModal()
                }

                {
                    drawerVisible &&
                    <DrawContainer
                        type='Issue'
                        id={id}
                        visible={drawerVisible}
                        closeDrawer={this.closeDrawer}
                        delOperation={this.delCurIssue} />
                }
            </div>
        )
    }
}
export default Issue