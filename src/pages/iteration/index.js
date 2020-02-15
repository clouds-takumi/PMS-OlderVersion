import { PureComponent } from 'react'
import s from './index.less'
import { Table, Divider, Tag, Card, Button, Icon, message, Modal, Input, DatePicker } from 'antd'
import DrawContainer from '../../components/drawer_container'
import { iterations, statusColorMap, statusMap } from './mock-data'

class Iteration extends PureComponent {
    state = {
        loading: false,
        iterations: [],
        id: null,
        delFlag: false,
        drawerVisible: false,
        editable: false,
        modalType: '',
        iterName: '',
        columns: [
            {
                title: '迭代名称',
                key: 'name',
                width: 120,
                render: iteration => <span style={{ cursor: 'pointer' }} onClick={() => this.showDrawer(iteration)}>{iteration.name}</span>
            },
            {
                title: '迭代阶段',
                dataIndex: 'status',
                key: 'status',
                width: 120,
                render: status => <Tag color={statusColorMap[status]}>{statusMap[status]}</Tag>
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'deadline',
                width: 120,
                render: dataIndex => <div>---</div>
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'deadline',
                width: 120,
                render: dataIndex => <div>---</div>
            },
            {
                title: '负责人',
                dataIndex: 'created',
                key: 'created',
                width: 100,
                render: dataIndex => <div>id_name</div>
            },
            {
                title: '操作',
                key: 'operation',
                render: iteration => {
                    return (
                        <>
                            <span className={s.operate} onClick={() => this.showEditModal(iteration)}>编辑</span>
                            <Divider type='vertical' />
                            <span className={s.operate} onClick={() => this.showDeleteModal(iteration)}>删除</span>
                        </>
                    )
                }
            },
        ]
    }

    showDrawer = iteration => { this.setState({ drawerVisible: true, id: iteration.id, editable: true }) }

    closeDrawer = () => this.setState({ drawerVisible: false })

    showDeleteModal = iteration => this.setState({ iterName: iteration.name, id: iteration.id, delFlag: true })

    closeDeleteModal = () => this.setState({ delFlag: false, iterName: '' })

    showCreateModal = () => this.setState({ modalType: 'create' })

    showEditModal = iteration => this.setState({ modalType: 'edit', iterName: iteration.name })

    closeModal = () => this.setState({ modalType: '', iterName: '' })

    handleConfirm = () => {
        const { modalType } = this.state
        if (modalType === 'create') {
            // 增加数据
            const iteration = {}
            //   const result = await addIteration(product)
            if ("result" && "result.id") {
                message.success('创建成功')
                this.fetchData()
                this.setState({ modalType: '', iterName: '' })
            }
        }
        if (modalType === 'edit') {
            // 修改数据
            const data = {}
            //   const result = await updateIdIteration(product, data)
            if ("result" && "result.id") {
                message.success('创建成功')
                this.fetchData()
                this.setState({ modalType: '', iterName: '' })
            }
        }
    }

    handleConfirmDel = () => {
        // 删除数据
        const { id } = this.state
        this.delCurIter(id)
        this.fetchData()
    }

    delCurIter = id => {
        // 删除数据 - drawer
        // delIdIter(id).then(() => {
        message.success(`删除${id}成功`)
        this.fetchData()
        this.setState({ drawerVisible: false, delFlag: false })
        // })
    }

    fetchData = () => {
        // 获取数据 
        // const resData = await reqIterations()
        if ("resData") {
            //   this.setState({ iterations: resData.lists, loading: false })
            this.setState({ iterations, loading: false })
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.fetchData()
    }

    renderDelModal = () => {
        const { iterName } = this.state
        return (
            <Modal
                title={null}
                visible
                closable={false}
                footer={null}
                className={s.modal}
                onCancel={eve => eve.stopPropagation()}>
                <div>删除迭代</div>
                <span>
                    当前正在删除迭代 {iterName}，该迭代下的所有事项将移入未规划，此操作不可撤销，是否确认？
                </span>
                <div>
                    <Button onClick={this.handleConfirmDel}>确认</Button>
                    <Button onClick={this.closeDeleteModal}>取消</Button>
                </div>
            </Modal>
        )
    }

    rendertitle = () => (<Button type='primary' onClick={this.showCreateModal} ><Icon type='plus' />添加迭代</Button>)

    renderModal = () => {
        const { modalType, iterName } = this.state
        return (
            <Modal
                title={null}
                visible
                closable={false}
                footer={null}
                className={s.modal}
                onCancel={eve => eve.stopPropagation()}>
                <>
                    {
                        modalType === 'create' && <div>创建迭代</div>
                    }
                    {
                        modalType === 'edit' && <div>编辑迭代</div>
                    }
                    <div>
                        <span>标题</span>
                        <Input placeholder='请输入迭代标题' value={iterName} onChange={e => this.setState({ iterName: e.target.value })} />
                    </div>
                    <div>
                        <div>
                            <span>开始时间</span>
                            <DatePicker></DatePicker>
                        </div>
                        <div>
                            <span>结束时间</span>
                            <DatePicker></DatePicker>
                        </div>
                    </div>
                    <div>
                        {
                            modalType === 'create' && <Button onClick={this.handleConfirm}>创建</Button>
                        }
                        {
                            modalType === 'edit' && <Button onClick={this.handleConfirm}>保存</Button>
                        }
                        <Button onClick={this.closeModal}>取消</Button>
                    </div>
                </>
            </Modal>
        )
    }

    render() {
        const { iterations, columns, loading, id, delFlag, drawerVisible, editable, modalType } = this.state
        return (
            <div>
                <div className={s.iterRoot}>
                    <Card title={this.rendertitle()}>
                        <Table
                            className={s.table}
                            loading={loading}
                            dataSource={iterations}
                            columns={columns}
                            rowKey='id'
                            pagination={{ total: 24, defaultPageSize: 8, showQuickJumper: true }} />
                    </Card>
                </div>

                {
                    delFlag && this.renderDelModal()
                }

                {
                    modalType !== '' && this.renderModal()
                }

                {
                    drawerVisible &&
                    <DrawContainer
                        type='Iteration'
                        id={id}
                        visible={drawerVisible}
                        closeDrawer={this.closeDrawer}
                        delOperation={this.delCurIter}
                        editable={editable} />
                }
            </div>
        )
    }
}
export default Iteration