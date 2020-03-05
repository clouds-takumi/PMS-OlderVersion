import { PureComponent } from 'react'
import s from './index.less'
import cn from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import { Table, Divider, Tag, Button, Icon, message, Modal, Input, DatePicker, Select } from 'antd'
import DrawContainer from '../../components/drawer_container'
import { reqIters, reqUserInfo, reqAllProjects, addIter, delIdIter, updateIdIter } from './service'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'

class Iteration extends PureComponent {
    state = {
        userInfo: {},
        projects: [],
        iterName: '', // *
        assignee: '',
        startDate: '', // *
        editorState: EditorState.createEmpty(),
        projectId: '', // *
        loading: false,
        iterations: {},
        id: null,
        delFlag: false,
        drawerVisible: false,
        modalFlag: '',
        columns: [
            {
                title: '迭代名称',
                width: 120,
                key: 'name',
                render: iteration => <div className={s.iterName} onClick={() => this.showDrawer(iteration)}>{iteration.name}</div>
            },
            {
                title: '所属项目',
                dataIndex: 'projectId',
                width: 120,
                key: 'projectId',
                render: dataIndex => {
                    if (this.state.projects) {
                        return this.state.projects.map(pro => {
                            if (pro.id && pro.id === dataIndex) {
                                return <div key={pro.id}>{pro.name}</div>
                            } else {
                                return null
                            }
                        })
                    } else {
                        return null
                    }
                }
            },
            {
                title: '开始时间',
                dataIndex: 'startDate',
                key: 'deadline',
                width: 120,
                render: dataIndex => {
                    if (dataIndex) {
                        return <div>{moment(dataIndex).format('YYYY/MM/DD')}</div>
                    } else {
                        return <div>未设定</div>
                    }
                }
            },
            {
                title: '状态',
                dataIndex: 'endDate',
                key: 'endDate',
                width: 120,
                render: dataIndex => {
                    if (dataIndex) {
                        return <div>项目结束于{moment(dataIndex).format('YYYY/MM/DD')}</div>
                    } else {
                        return <div>进行中</div>
                    }
                }
            },
            {
                title: '负责人',
                dataIndex: 'assignee',
                key: 'assignee',
                width: 120,
                render: dataIndex => {
                    if (dataIndex) {
                        return <div>{this.state.userInfo.username}</div>
                    } else {
                        return <div>未分配</div>
                    }
                }
            },
            {
                title: '操作',
                width: 120,
                key: 'operation',
                render: iteration => {
                    return (
                        <>
                            <span className={s.operate} onClick={() => this.showEditModal(iteration)}>编辑</span>
                            <Divider type='vertical' />
                            <span style={{ cursor: 'pointer', color: '#dd3e6e' }} onClick={() => this.showDeleteModal(iteration)}>删除</span>
                        </>
                    )
                }
            },
        ]
    }

    showDrawer = iteration => { this.setState({ drawerVisible: true, id: iteration.id }) }

    closeDrawer = () => this.setState({ drawerVisible: false })

    showDeleteModal = iteration => this.setState({
        iterName: iteration.name, id: iteration.id, delFlag: true
    })

    closeDeleteModal = () => this.setState({ delFlag: false, iterName: '' })

    showCreateModal = () => this.setState({ modalFlag: true })

    showEditModal = iteration => {
        this.setState({
            modalFlag: true, iterName: iteration.name,
            id: iteration.id, projectId: iteration.projectId,
            assignee: iteration.assignee, startDate: iteration.startDate
        })
    }
    closeModal = () => this.setState({ modalFlag: false, assignee: null, startDate: null, id: null, iterName: null, projectId: null })

    onEditorStateChange = editorState => this.setState({ editorState })

    handleSelectAss = value => this.setState({ assignee: value })
    handleSelectPro = value => this.setState({ projectId: value })
    handleSelectDate = (date, dateString) => this.setState({ startDate: dateString })

    handleSure = async () => {
        const { editorState, assignee, startDate, id, iterName, projectId } = this.state
        const tempDescStr = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        if (!iterName) {
            this.fun1()
            return
        }
        if (iterName) {
            if (iterName.length > 20) {
                this.fun2()
                return
            } else if (!projectId) {
                this.fun3()
                return
            } else if (!startDate) {
                this.fun4()
                return
            } else {
                const data = { ...this.state.issues, name: iterName, projectId, startDate, desc: tempDescStr, assignee }
                if (id) {
                    const res = await updateIdIter(id, data)
                    this.setState({ modalFlag: false, assignee: null, startDate: null, id: null, iterName: null, projectId: null })
                    this.fetchData()
                    return
                } else {
                    const res = await addIter(data)
                    if (res) {
                        this.setState({ modalFlag: false, assignee: null, startDate: null, id: null, iterName: null, projectId: null })
                        this.fetchData()
                    }
                    return
                }
            }
        }
    }
    fun1 = _.throttle(() => message.info({ top: 0, key: '1', content: '请填写迭代名称' }), 3000)
    fun2 = _.throttle(() => message.info({ top: 0, key: '1', content: '迭代名称不应该超过20位' }), 3000)
    fun3 = _.throttle(() => message.info({ top: 0, key: '1', content: '请选择所属项目' }), 3000)
    fun4 = _.throttle(() => message.info({ top: 0, key: '1', content: '请选择开始日期' }), 3000)

    handleConfirmDel = () => {
        const { id } = this.state
        this.delCurIter(id)
        this.fetchData()
    }

    delCurIter = id => {
        delIdIter(id).then(() => {
            message.success(`删除成功`)
            this.fetchData()
            this.setState({ drawerVisible: false, delFlag: false })
        })
    }

    handleChange = page => {
        reqIters(page).then(res => this.setState({ iterations: res }))
    }

    fetchData = async () => {
        const resData = await reqIters()
        if (resData) {
            this.setState({ iterations: resData, loading: false })
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.fetchData()
        reqAllProjects().then(res => this.setState({ projects: res.lists }))
        reqUserInfo().then(res => this.setState({ userInfo: res }))
    }

    renderDelModal = () => {
        const { iterName } = this.state
        return (
            <Modal
                title={null}
                visible
                closable={false}
                footer={null}
                onCancel={eve => eve.stopPropagation()}>
                <div className={s.delRoot}>
                    <div className={s.title}>删除迭代</div>
                    <span className={s.subtitle}>
                        当前正在删除迭代 <span style={{ color: 'red' }}>{iterName}</span>，该迭代下的所有事项将移入未规划，此操作不可撤销，是否确认？
                </span>
                    <div style={{ marginTop: '30px' }}>
                        <Button onClick={this.handleConfirmDel} className={cn(s.lBtn, s.btn)}>确认</Button>
                        <Button onClick={this.closeDeleteModal} className={cn(s.rBtn, s.btn)}>取消</Button>
                    </div>
                </div>
            </Modal>
        )
    }

    rendertitle = () => (
        <div className={s.titleroot}>
            <Button className={s.addBtn} onClick={this.showCreateModal} >
                <Icon type='plus' />添加迭代
            </Button>
        </div>)

    renderModal = () => {
        const { projects, userInfo, id, iterName, editorState, assignee, projectId, startDate } = this.state
        return (
            <Modal
                title={null}
                visible
                closable={false}
                footer={null}
                className={s.modalWraper}
                onCancel={eve => eve.stopPropagation()}>
                <div className={s.addModalRoot}>
                    <div className={s.leftContainer}>
                        <div className={s.title}>{id ? '修改迭代' : '创建迭代'}</div>
                        <span className={s.subtitle}>
                            <div style={{ marginBottom: '10px' }}>
                                标题<span style={{ color: 'red' }}> *</span>
                            </div>
                        </span>
                        <Input value={iterName} onChange={(e) => this.setState({ iterName: e.target.value })} />
                        <div>
                            <span className={s.subtitle}>
                                <div style={{ margin: '20px 0 10px 0' }}>
                                    迭代描述
                            </div>
                            </span>
                            <div>
                                <Editor
                                    toolbarHidden
                                    toolbarClassName={s.editTool}
                                    editorClassName={s.editContainer}
                                    wrapperClassName={s.editWrap}
                                    editorState={editorState}
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <Button type='primary' onClick={this.handleSure} className={cn(s.lBtn, s.btn)}>{id ? '修改' : '创建'}</Button>
                            <Button onClick={this.closeModal} className={cn(s.rBtn, s.btn)}>取消</Button>
                        </div>
                    </div>

                    <div className={s.rightContainer}>
                        {/* 所属项目 */}
                        <div>
                            <div className={s.rtitle}>所属项目<span style={{ color: 'red' }}> *</span></div>
                            <div style={{ display: 'flex' }}>
                                <Select style={{ width: 120 }} defaultValue={projectId ? projectId : '请选择'} onChange={this.handleSelectPro} >
                                    {
                                        projects.map(pro => (
                                            <Select.Option key={pro.id} value={pro.id}>{pro.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <Divider type='horizontal' />
                        {/* 开始日期 */}
                        <div>
                            <div className={s.rtitle}>开始日期<span style={{ color: 'red' }}> *</span></div>
                            {
                                id ? <DatePicker onChange={this.handleSelectDate} placeholder={startDate}></DatePicker>
                                    : <DatePicker onChange={this.handleSelectDate} placeholder='请选择日期'></DatePicker>
                            }
                        </div>
                        <Divider type='horizontal' />
                        {/* 处理人 */}
                        <div>
                            <div className={s.rtitle}>处理人</div>
                            <div style={{ display: 'flex' }}>
                                <Select defaultValue={assignee ? assignee : '未分配'} style={{ width: 120 }} onChange={this.handleSelectAss} >
                                    <Select.Option key={userInfo.id} value={userInfo.id}>{userInfo.username}</Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    render() {
        const { iterations, columns, loading, id, delFlag, drawerVisible, modalFlag } = this.state
        return (
            <>
                {
                    this.rendertitle()
                }
                <div className={s.iterRoot}>
                    <Table
                        className={s.table}
                        loading={loading}
                        dataSource={iterations.lists}
                        columns={columns}
                        rowKey='id'
                        pagination={{ total: iterations.total, pageSize: iterations.pageSize, hideOnSinglePage: true, onChange: this.handleChange }} />
                </div>

                {
                    delFlag && this.renderDelModal()
                }

                {
                    modalFlag && this.renderModal()
                }

                {
                    drawerVisible &&
                    <DrawContainer
                        type='Iteration'
                        id={id}
                        visible={drawerVisible}
                        closeDrawer={this.closeDrawer}
                        delOperation={this.delCurIter} />
                }
            </>
        )
    }
}
export default Iteration