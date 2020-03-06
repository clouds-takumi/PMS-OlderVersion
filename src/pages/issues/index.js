import { PureComponent } from 'react'
import s from './index.less'
import cn from 'classnames'
import DrawContainer from '../../components/drawer_container'
import { Table, Icon, message, Button, Modal, Input, Divider, DatePicker, Select, Popconfirm } from 'antd'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import _ from 'lodash'
import moment from 'moment'
import { reqUserInfo, reqAllIters, reqIssues, addIssue, delIdIssue, updateIdIssue, reqIdIssue } from './service'

const priorityMap = [
    { id: 1, name: '紧急' },
    { id: 2, name: '优先' },
    { id: 3, name: '一般' },
]

class Issue extends PureComponent {
    state = {
        iters: [],
        userInfo: {},
        loading: false,
        issues: {},
        id: null,
        addFlag: false,
        drawerVisible: false,
        issueName: '', // *
        editorState: EditorState.createEmpty(),
        assignee: '',
        priority: 0, // *
        deadline: '',
        iter: null,
        curIssue: {},
        columns: [
            {
                title: '需求标题',
                width: 120,
                key: 'name',
                render: issues => <div className={s.issName} onClick={() => this.showDrawer(issues)}>{issues.name}</div>
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
                title: '优先级',
                dataIndex: 'priority',
                key: 'priority',
                width: 120,
                render: dataIndex => priorityMap.map((item, index) => {
                    if (item.id === dataIndex) {
                        return <div key={index + 10}>{item.name}</div>
                    } else {
                        return null
                    }
                })
            },
            {
                title: '创建日期',
                dataIndex: 'createdAt',
                key: 'createdAt',
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
                title: '截止日期',
                dataIndex: 'deadline',
                key: 'deadline',
                width: 120,
                render: dataIndex => {
                    if (dataIndex) {
                        return <div>{moment(dataIndex).format('YYYY/MM/DD')}</div>
                    } else {
                        return <div>未确定</div>
                    }
                }
            },
            {
                title: '所属迭代',
                dataIndex: 'iterationId',
                key: 'iterationId',
                width: 120,
                render: dataIndex => {
                    if (dataIndex) {
                        if (this.state.iters) {
                            return this.state.iters.map((item, index) => {
                                if (item.id === dataIndex) {
                                    return <div key={index}>{item.name}</div>
                                } else {
                                    return null
                                }
                            })
                        }
                    } else {
                        return <div>未进行规划</div>
                    }
                }
            },
            {
                title: '操作',
                key: 'operate',
                width: 120,
                render: issue => {
                    return (
                        <>
                            <span className={s.operate} onClick={() => this.issueEdit(issue)}>编辑</span>
                            <Divider type='vertical' />
                            <Popconfirm
                                title='确认删除?'
                                onConfirm={() => this.delCurIssue(issue.id)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <span style={{ cursor: 'pointer', color: '#dd3e6e' }}>删除</span>
                            </Popconfirm>
                        </>
                    )
                }
            },
        ]
    }

    issueEdit = ({ id, name, desc, assignee, priority, deadline, iterationId }) => this.setState({
        id,
        addFlag: true,
        issueName: name,
        assignee,
        priority,
        deadline,
        iter: iterationId
    })

    showDrawer = issues => {
        reqIdIssue(issues.id).then(res => {
            this.setState({ curIssue: res })
            this.setState({ drawerVisible: true, id: issues.id })
        })

    }
    closeDrawer = () => this.setState({ drawerVisible: false })

    showCreateModal = () => this.setState({ addFlag: true })
    closeAddModal = () => this.setState({ addFlag: false, issueName: '', id: null, assignee: null, priority: null, deadline: '', iter: null })

    onEditorStateChange = editorState => this.setState({ editorState })

    handleSelectPri = value => this.setState({ priority: value })
    handleSelectAss = value => this.setState({ assignee: value })
    handleSelectIter = value => this.setState({ iter: value })
    handleSelectDate = (date, dateString) => this.setState({ deadline: dateString })

    handleSure = async () => {
        const { issueName, editorState, assignee, priority, deadline, id, iter } = this.state
        console.log(deadline)
        const tempDescStr = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const data = { name: issueName, priority, desc: tempDescStr, assignee, iterationId: iter, deadline }
        if (!issueName) {
            this.fun1()
            return
        }
        if (issueName) {
            if (issueName.length > 20) {
                this.fun2()
                return
            } else {
                if (!priority) {
                    this.fun3()
                    return
                }
                if (id) {
                    const res = await updateIdIssue(id, data)
                    this.setState({ addFlag: false, issueName: '', deadline: '', id: null, iter: null, assignee: null, priority: null })
                    this.fetchData()
                    return
                } else {
                    const res = await addIssue(data)
                    if (res) {
                        this.setState({ addFlag: false, issueName: '', deadline: '', id: null, iter: null, assignee: null, priority: null })
                        this.fetchData()
                    }
                    return
                }
            }
        }
    }
    fun1 = _.throttle(() => message.info({ top: 0, key: '1', content: '请填写需求名称' }), 3000)
    fun2 = _.throttle(() => message.info({ top: 0, key: '1', content: '需求名称不应该超过20位' }), 3000)
    fun3 = _.throttle(() => message.info({ top: 0, key: '1', content: '请选择优先等级' }), 3000)

    delCurIssue = id => {
        delIdIssue(id).then(() => {
            message.success(`删除成功`)
            this.fetchData()
            this.setState({ drawerVisible: false, delFlag: false })
        })
    }

    handleChange = page => {
        reqIssues(page).then(res => this.setState({ issues: res }))
    }

    updateCurIssue = async (id, data) => {
        const res = await updateIdIssue(id, data)
        this.fetchData()
    }

    fetchData = async () => {
        const resData = await reqIssues()
        if (resData) {
            this.setState({ issues: resData, loading: false })
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.fetchData()
        reqUserInfo().then(res => this.setState({ userInfo: res }))
        reqAllIters().then(res => { this.setState({ iters: res.lists }) })
    }

    rendertitle = () => (
        <div className={s.titleroot}>
            <Button className={s.addBtn} onClick={this.showCreateModal} ><Icon type='plus' />创建需求</Button>
        </div>
    )

    renderAddModal = () => {
        const { issueName, editorState, userInfo, id, assignee, iters, priority, deadline, iter } = this.state
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
                        <div className={s.title}>{id ? '修改需求' : '创建需求'}</div>
                        <span className={s.subtitle}>
                            <div style={{ marginBottom: '10px' }}>
                                标题<span style={{ color: 'red' }}> *</span>
                            </div>
                        </span>
                        <Input value={issueName} onChange={(e) => this.setState({ issueName: e.target.value })} />
                        <div>
                            <span className={s.subtitle}>
                                <div style={{ margin: '20px 0 10px 0' }}>
                                    需求描述
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
                            <Button onClick={this.closeAddModal} className={cn(s.rBtn, s.btn)}>取消</Button>
                        </div>
                    </div>

                    <div className={s.rightContainer}>
                        {/* 所属迭代 */}
                        <div>
                            <div className={s.rtitle}>所属迭代</div>
                            <div style={{ display: 'flex' }}>
                                <Select style={{ width: 120 }} onChange={this.handleSelectIter} defaultValue={iter ? iter : '请选择'}>
                                    {
                                        iters.map(iter => (
                                            <Select.Option key={iter.id} value={iter.id}>{iter.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        <Divider type='horizontal' />
                        {/* 处理人 */}
                        <div>
                            <div className={s.rtitle}>负责人</div>
                            <div style={{ display: 'flex' }}>
                                <Select defaultValue={assignee ? assignee : '未分配'} style={{ width: 120 }} onChange={this.handleSelectAss} >
                                    <Select.Option key={userInfo.id} value={userInfo.id}>{userInfo.username}</Select.Option>
                                </Select>
                            </div>
                        </div>
                        <Divider type='horizontal' />
                        {/* 优先级 */}
                        <div style={{ marginBottom: '20px' }}>
                            <div className={s.rtitle}>优先级<span style={{ color: 'red' }}> *</span></div>
                            <div style={{ display: 'flex' }}>
                                <Select style={{ width: 120 }} defaultValue={priority ? priority : '请选择'} onChange={this.handleSelectPri} >
                                    {
                                        priorityMap.map(item => (
                                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                        {/* 截止日期 */}
                        <div>
                            <div className={s.rtitle}>截止日期</div>
                            {
                                id ? <DatePicker onChange={this.handleSelectDate} placeholder={deadline ? deadline : '请选择'} ></DatePicker>
                                    : <DatePicker onChange={this.handleSelectDate} defaultValue='请选择'></DatePicker>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    render() {
        const { issues, columns, id, drawerVisible, addFlag, curIssue } = this.state
        return (
            <div style={{ marginTop: '20px' }}>
                {
                    this.rendertitle()
                }

                <div className={s.iterRoot}>
                    <Table
                        className={s.table}
                        dataSource={issues.lists}
                        columns={columns}
                        rowKey='id'
                        pagination={{ total: issues.total, pageSize: issues.pageSize, hideOnSinglePage: true, onChange: this.handleChange }}
                    />
                </div>

                {
                    addFlag && this.renderAddModal()
                }

                {
                    drawerVisible &&
                    <DrawContainer
                        type='Issue'
                        id={id}
                        data={curIssue}
                        visible={drawerVisible}
                        closeDrawer={this.closeDrawer}
                        delOperation={this.delCurIssue}
                        updateOperation={this.updateCurIssue} />
                }
            </div>
        )
    }
}
export default Issue