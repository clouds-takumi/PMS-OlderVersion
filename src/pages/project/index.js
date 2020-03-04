import { Component } from 'react'
import s from './index.less'
import cn from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import DrawContainer from '../../components/drawer_container'
import { Table, Tag, Divider, Form, Select, Button, Input, DatePicker, message, Modal, Icon } from 'antd'
import { reqProjects, reqUserInfo, reqTags, addProject, delIdProject } from './service'

const statusOptions = [
  {
    id: 0,
    name: '未开始',
  },
  {
    id: 1,
    name: '进行中',
  },
  {
    id: 2,
    name: '已完成',
  },
]

const statusMap = {
  0: '未开始',
  1: '进行中',
  2: '已完成',
}

const statusColorMap = {
  0: '#2db7f5',
  1: '#87d068',
  2: '#f50',
}

class Project extends Component {
  state = {
    projects: {},
    userInfo: null,
    tags: [],
    selectedTags: [],
    loading: false,
    proName: '',
    proId: null,
    modalType: '',
    drawerVisible: false,
    editable: false,
    columns: [
      {
        title: '项目名称',
        dataIndex: 'name',
        width: 120,
        key: 'name',
        render: dataIndex => <div className={s.proName} onClick={() => this.showDrawer(dataIndex)}>{dataIndex}</div>
      },
      {
        title: '项目状态',
        dataIndex: 'status',
        width: 120,
        key: 'status',
        render: dataIndex => dataIndex ? <Tag color={statusColorMap[dataIndex]}>{statusMap[dataIndex]}</Tag> : <Tag color='#2db7f5'>未设定</Tag>
      },
      {
        title: '创建日期',
        dataIndex: 'createdAt',
        width: 120,
        key: 'createdAt',
        render: dataIndex => {
          if (dataIndex) {
            return <div>{moment(dataIndex).format('YYYY/MM/DD')}</div>
          } else {
            return <div>未设定</div>
          }
        }
      },
      {
        title: '创建人',
        dataIndex: 'userId',
        width: 120,
        key: 'userId',
        // TODO: 创建人id映射
        render: dataIndex => <div className={s.proName}>{dataIndex}</div>
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 120,
        key: 'tags',
        render: dataIndex => {
          const { tags } = this.state
          if (dataIndex) {
            const idArr = dataIndex.split(',')
            const tagsArr = [].slice.call(tags)
            const renderArr = tagsArr.filter(item => idArr.includes(item.id))
            if (renderArr) {
              return renderArr.map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)
            }
          } else {
            return (
              <Tag color='gray'>未设定</Tag>
            )
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
        width: 120,
        key: 'operate',
        render: id => {
          return (
            <>
              <span className={s.operate} onClick={() => this.setState({ proId: id, drawerVisible: true, editable: true })}>编辑</span>
              <Divider type='vertical' />
              <span style={{ cursor: 'pointer', color: '#dd3e6e' }} onClick={() => this.handleDelPro(id)}>删除</span>
            </>
          )
        }
      },
    ]
  }

  showCreateModal = () => this.setState({ modalType: 'create' })

  showDeleteModal = () => this.setState({ modalType: 'delete' })

  closeModal = () => { this.setState({ modalType: '', proName: '' }) }

  showDrawer = (name) => {
    let proId
    const { projects } = this.state
    for (let item of projects.lists) {
      if (item.name === name) {
        proId = item.id
        break
      }
    }
    this.setState({ proId, drawerVisible: true, editable: false })
  }

  closeDrawer = () => this.setState({ drawerVisible: false })

  delCurPro = id => {
    delIdProject(id).then(() => {
      message.success('删除成功')
      this.fetchData()
      this.setState({ drawerVisible: false })
    })
  }

  handleDelPro = async (id) => {
    let proName
    const { projects } = this.state
    for (let item of projects.lists) {
      if (item.id === id) {
        proName = item.name
        break
      }
    }
    this.setState({ proId: id, proName, modalType: 'delete' })
  }

  handleConfirm = async () => {
    const { modalType, proName, userInfo, selectedTags } = this.state
    if (modalType === 'delete') {
      delIdProject(this.state.proId).then(() => {
        message.success('删除成功')
        this.setState({ modalType: '', proName: '' })
        this.fetchData()
      })
    }
    if (modalType === 'create') {
      if (!proName) {
        this.fun1()
        return
      }
      if (proName.length > 20) {
        this.fun2()
        return
      }
      if (selectedTags.length > 3) {
        this.fun3()
        return
      }
      const tagsStr = selectedTags.join(',')
      const product = { name: proName, status: 0, created: userInfo.id, tags: tagsStr }
      const result = await addProject(product)
      if (result && result.id) {
        message.success('创建成功')
        this.setState({ modalType: '', proName: '', selectedTags: [] })
        this.fetchData()
      }
    }
  }
  fun1 = _.throttle(() => message.info({ top: 0, key: '1', content: '请填写需求名称' }), 3000)
  fun2 = _.throttle(() => message.info({ top: 0, key: '1', content: '项目名称超过了20个字符' }), 3000)
  fun3 = _.throttle(() => message.info({ top: 0, key: '1', content: '项目标签应该不多于3个' }), 3000)

  handleSearch = event => {
    event.preventDefault()
    message.success('筛选待完善')
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // const { name, status, created, tag } = values
        // const result = await searchProject(product)
        if ('result.status===0') {
          this.setState({ projects: [] })
        } else {
          message.error('result.msg')
        }
      }
    })
  }

  handleRest = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    this.fetchData()
  }

  handleSelectTag = (value) => {
    if (value) {
      this.setState({ selectedTags: value })
    }
  }

  handleChange = page => {
    reqProjects(page).then(res => this.setState({ projects: res }))
  }

  fetchData = async () => {
    const resData = await reqProjects()
    if (resData) {
      this.setState({ projects: resData, loading: false })
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.fetchData()
    reqUserInfo().then(res => { this.setState({ userInfo: res }) })
    reqTags().then(res => this.setState({ tags: res }))
  }

  renderSearchForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form layout='inline' onSubmit={this.handleSearch} className={s.formRoot}>
          <Form.Item label='名称'>
            {
              getFieldDecorator('name', {
                rules: []
              })(<Input placeholder='请输入项目名称' />)
            }
          </Form.Item>
          <Form.Item label='项目状态'>
            {
              getFieldDecorator('status', {
                rules: []
              })(<Select placeholder='请选择' style={{ width: 140 }}>
                {statusOptions.map(status => <Select.Option key={status.id}>{status.name}</Select.Option>)}
              </Select>)
            }
          </Form.Item>
          <Form.Item label='项目日期'>
            <DatePicker />
          </Form.Item>
          <Form.Item label='创建人'>
            {
              getFieldDecorator('created', {
                rules: []
              })(<Select placeholder='请选择' style={{ width: 140 }}>
                {/* {createdOptions.map(created => <Select.Option key={created.id}>{created.name}</Select.Option>)} */}
              </Select>)
            }
          </Form.Item>
          <Form.Item label='标签'>
            {
              getFieldDecorator('tag', {
                rules: []
              })(<Select placeholder='请选择' style={{ width: 140 }}>
                {this.state.tags && this.state.tags.map(tag => <Select.Option key={tag.id}>{tag.name}</Select.Option>)}
              </Select>)
            }
          </Form.Item>
        </Form>
        <>
          <Button type='primary' style={{ marginRight: 12 }} htmlType="submit">筛选</Button>
          <Button onClick={this.handleRest}>重置</Button>
        </>
      </>
    )
  }

  renderModal = () => {
    const { modalType, proName } = this.state
    return (
      <Modal
        title={null}
        visible
        closable={false}
        footer={null}
        onCancel={(eve) => eve.stopPropagation()}>
        <div onClick={(eve) => eve.stopPropagation()} className={s.modalContainer}>
          {
            modalType === 'delete' && <div className={s.modalTitle}>确认删除当前 <span style={{ color: "#dd3e6e" }}>{`${this.state.proName}`}</span> 项目吗？</div>
          }
          {
            modalType === 'create' && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontWeight: 600 }}>项目名称</span>
                  <div style={{ height: '8px' }}></div>
                  <Input
                    placeholder='请输入项目名称，不超过20个字符'
                    value={proName}
                    onChange={(e) => this.setState({ proName: e.target.value })} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 600 }}>标签</span>
                  <div style={{ height: '8px' }}></div>
                  <Select
                    mode="multiple"
                    placeholder='请选择标签, 不超过三个'
                    style={{ width: '100%' }}
                    onChange={this.handleSelectTag}>
                    {this.state.tags && this.state.tags.map(
                      tag => <Select.Option key={tag.id} ><Tag color={tag.color}>{tag.name}</Tag></Select.Option>)}
                  </Select>
                </div>
              </>
            )
          }
          <div className={s.modalBtn}>
            <Button type='primary' onClick={this.handleConfirm} className={cn(s.btn, s.addBtn)}>确认</Button>
            <Button onClick={this.closeModal}>取消</Button>
          </div>
        </div>
      </Modal>
    )
  }

  renderAddBtn() {
    return (
      <div className={s.btnRoot}>
        <Button className={s.addBtn} onClick={this.showCreateModal}>
          <Icon type='plus' />添加项目
      </Button>
      </div>

    )
  }

  render() {
    const { columns, projects, drawerVisible, proId, editable, loading, modalType } = this.state
    return (
      <div className={s.project}>
        {
          this.renderAddBtn()
        }
        {/* <Card
          title={this.renderSearchForm()}
        > */}
        <Table
          className={s.table}
          loading={loading}
          dataSource={projects.lists}
          columns={columns}
          rowKey='id'
          pagination={{ total: projects.total, pageSize: projects.pageSize, hideOnSinglePage: true, onChange: this.handleChange }} />
        {/* </Card> */}

        {
          drawerVisible && (
            <DrawContainer
              type='Project'
              id={proId}
              editable={editable}
              visible={drawerVisible}
              closeDrawer={this.closeDrawer}
              delOperation={this.delCurPro} />
          )
        }

        {
          modalType !== '' && this.renderModal()
        }
      </div>
    )
  }
}

export default Form.create({})(Project)
