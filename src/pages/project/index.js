import { Component } from 'react'
import s from './index.less'
import cn from 'classnames'
import DrawContainer from '../../components/drawer_container'
import { Table, Tag, Divider, Form, Select, Button, Input, DatePicker, message, Modal, Card, Icon } from 'antd'
import { reqProjects, reqUserInfo, reqTags, addProject, delIdProject, reqIdProject, updateIdProject } from './service'

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
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      userInfo: null,
      tags: null,
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
          key: 'name',
          render: dataIndex => <span className={s.proName} onClick={() => this.showDrawer(dataIndex)}>{dataIndex}</span>
        },
        {
          title: '项目状态',
          dataIndex: 'status',
          key: 'status',
          render: dataIndex => <Tag color={statusColorMap[dataIndex]}>{statusMap[dataIndex]}</Tag>
        },
        {
          title: '开始日期',
          dataIndex: 'start_date',
          key: 'start_date',
          render: dataIndex => dataIndex ? null : <span>---</span>
        },
        {
          title: '结束日期',
          dataIndex: 'endDate',
          key: 'endDate',
          render: dataIndex => dataIndex ? null : <span>---</span>
        },
        {
          title: '创建人',
          dataIndex: 'created',
          key: 'created',
          render: dataIndex => <span>x {dataIndex} x</span>
        },
        {
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
          render: dataIndex => {
            if (dataIndex && this.state.tags) {
              const idArr = dataIndex.split(',').map(Number)
              const tagsArr = [].slice.call(this.state.tags)
              const renderArr = tagsArr.filter(item => idArr.includes(item.id))
              if (renderArr) {
                return renderArr.map(tag => <Tag key={tag.id} color={tag.color}>{tag.name}</Tag>)
              }
            } else {
              return (
                <span>---</span>
              )
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'id',
          key: 'operate',
          render: id => {
            return (
              <>
                <span className={s.operate} onClick={() => this.setState({ proId: id, drawerVisible: true, editable: true })}>编辑</span>
                <Divider type='vertical' />
                <span className={s.operate} onClick={() => this.handleDelPro(id)}>删除</span>
              </>
            )
          }
        },
      ]
    }
  }

  showCreateModal = () => this.setState({ modalType: 'create' })

  showDeleteModal = () => this.setState({ modalType: 'delete' })

  closeModal = () => { this.setState({ modalType: '', proName: '' }) }

  showDrawer = (name) => {
    let proId
    const { projects } = this.state
    for (let item of projects) {
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
    for (let item of projects) {
      if (item.id === id) {
        proName = item.name
        break
      }
    }
    this.setState({ proId: id, proName, modalType: 'delete' })
  }

  handleConfirm = async () => {
    const { modalType, proName, userInfo } = this.state
    if (modalType === 'delete') {
      delIdProject(this.state.proId).then(() => {
        message.success('删除成功')
        this.setState({ modalType: '', proName: '' })
        this.fetchData()
      })
    }
    if (modalType === 'create') {
      const { selectedTags } = this.state
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

  fetchData = async () => {
    const resData = await reqProjects()
    if (resData) {
      this.setState({ projects: resData.lists, loading: false })
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
        className={s.modal}
        onCancel={(eve) => eve.stopPropagation()}>
        <div onClick={(eve) => eve.stopPropagation()} className={s.modalContainer}>
          {
            modalType === 'delete' && <div className={s.modalTitle}>确认删除当前 "{`${this.state.proName}`}" 项目吗？</div>
          }
          {
            modalType === 'create' && (
              <>
                <div className={s.xxx}>
                  <span>项目名称</span>
                  <Input
                    placeholder='请输入项目名称'
                    value={proName}
                    onChange={(e) => this.setState({ proName: e.target.value })} />
                </div>

                <div className={s.xxx}>
                  <span>标签</span>
                  <Select
                    mode="multiple"
                    placeholder='请选择标签'
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
            <Button type='primary' onClick={this.handleConfirm} className={cn(s.btn, s.leftBtn)}>确认</Button>
            <Button type='primary' onClick={this.closeModal} className={cn(s.btn, s.rightBtn)}>取消</Button>
          </div>
        </div>
      </Modal>
    )
  }

  render() {
    const { columns, projects, drawerVisible, proId, editable, loading, modalType } = this.state

    return (
      <div className={s.project}>

        <Card
          title={this.renderSearchForm()}
          actions={[
            <Button type='primary' className={s.addBtn} onClick={this.showCreateModal}>
              <Icon type='plus' />添加项目
            </Button>
          ]}
        >
          <Table
            className={s.table}
            loading={loading}
            dataSource={projects}
            columns={columns}
            rowKey='id'
            pagination />
        </Card>

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
