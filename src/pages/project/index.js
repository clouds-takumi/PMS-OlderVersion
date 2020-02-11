import { Component } from 'react'
import s from './index.less'
import cn from 'classnames'
import DrawContainer from '../../components/drawer_container'
import { Table, Tag, Divider, Form, Select, Button, Input, DatePicker, message, Modal } from 'antd'
// import { reqProjects, reqIdProject, addProject, delIdProject, updataIdProject } from '../../services'
import { Projects, colors, statusMap, statusColorMap, statusOptions, tagOptions, createdOptions } from './mock-data'

class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerVisible: false,
      proName: '',
      proId: null,
      projects: [],
      loading: false,
      editable: false,
      createFlag: false,
      showDelModal: false
    }
    this.initColumns()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
        render: (dataIndex) => <span className={s.proName} onClick={() => this.showDrawer(dataIndex)}>{dataIndex}</span>
      },
      {
        title: '项目状态',
        dataIndex: 'status',
        key: 'status',
        render: status => <Tag color={statusColorMap[status]}>{statusMap[status]}</Tag>
      },
      {
        title: '开始日期',
        dataIndex: 'startDate',
        key: 'startDate',
      },
      {
        title: '结束日期',
        dataIndex: 'endDate',
        key: 'endDate',
      },
      {
        title: '创建人',
        dataIndex: 'created',
        key: 'created',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => {
          return (
            <>
              {tags.map((tag, index) => <Tag key={tag} color={colors[index]}>{tag}</Tag>)}
            </>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'operate',
        render: id => {
          return (
            <>
              <span className={s.operate} onClick={() => this.setState({ proId: id, drawerVisible: true })}>编辑</span>
              <Divider type='vertical' />
              <span className={s.operate} onClick={() => this.handleDelPro(id)}>删除</span>
            </>
          )
        }
      },
    ]
  }

  showDrawer = (name) => {
    let proId
    const { projects } = this.state
    for (let item of projects) {
      if (item.name === name) {
        proId = item.id
        break
      }
    }
    this.setState({ proId, drawerVisible: true })
  }

  closeDrawer = () => this.setState({ drawerVisible: false })

  closeModal = (eve) => {
    eve.stopPropagation()
    this.setState({ showDelModal: false })
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
    this.setState({ proId: id, proName, showDelModal: true })
  }

  handleSureDel = () => {
    // const res = await delIdProject(this.state.proId)
    if ('res.status===0') {
      message.success('删除成功')
      this.fetchData({ type: 'projects' })
      this.setState({ showDelModal: false })
    } else {
      message.error('result.msg')
    }
  }

  handleCreate = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, status, created } = values
        const product = { name, status, created }
        // const result = await addProject(product)
        if ('result.status===0') {
          message.success(`${name}-${status}-${created}`)
          this.fetchData({ type: 'projects' })
          this.setState({ createFlag: false })
        } else {
          message.error('result.msg')
        }
      }
    })
  }

  handleSearch = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { sname, sstatus, screated, tag } = values
        const product = { sname, sstatus, screated, tag }
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
    this.fetchData({ type: 'projects' })
  }

  renderModal = (showDelModal) => {
    return (
      <Modal
        title={null}
        visible
        closable={false}
        footer={null}
        className={s.modal}
        onCancel={(eve) => eve.stopPropagation()}>
        <div onClick={(eve) => eve.stopPropagation()} className={s.modalContainer}>
          <div className={s.modalTitle}>确认删除当前 "{`${this.state.proName}`}" 项目吗？</div>
          <div className={s.modalBtn}>
            <Button type='primary' onClick={this.handleSureDel} className={cn(s.btn, s.leftBtn)}>确认</Button>
            <Button type='primary' onClick={this.closeModal} className={cn(s.btn, s.rightBtn)}>取消</Button>
          </div>
        </div>
      </Modal>
    )
  }

  renderForm = (type) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' style={{ marginBottom: 24 }} onSubmit={type === 'create' ? this.handleCreate : this.handleSearch}>
        <Form.Item label='名称'>
          {
            type === 'create' && getFieldDecorator('name', {
              rules: [{ required: true }]
            })(<Input placeholder='请输入项目名称' />)
          }
          {
            type === 'search' && getFieldDecorator('sname', {
              rules: []
            })(<Input placeholder='请输入项目名称' />)
          }
        </Form.Item>
        <Form.Item label='项目状态'>
          {
            type === 'create' && getFieldDecorator('status', {
              rules: [{ required: true }]
            })(<Select placeholder='请选择' style={{ width: 140 }}>
              {statusOptions.map(status => <Select.Option key={status.id}>{status.name}</Select.Option>)}
            </Select>)
          }
          {
            type === 'search' && getFieldDecorator('sstatus', {
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
            type === 'create' && getFieldDecorator('created', {
              rules: [{ required: true }]
            })(<Select placeholder='请选择' style={{ width: 140 }}>
              {createdOptions.map(created => <Select.Option key={created.id}>{created.name}</Select.Option>)}
            </Select>)
          }
          {
            type === 'search' && getFieldDecorator('screated', {
              rules: []
            })(<Select placeholder='请选择' style={{ width: 140 }}>
              {createdOptions.map(created => <Select.Option key={created.id}>{created.name}</Select.Option>)}
            </Select>)
          }
        </Form.Item>
        <Form.Item label='标签'>
          {
            getFieldDecorator('tag', {
              rules: []
            })(<Select placeholder='请选择' style={{ width: 140 }}>
              {tagOptions.map(tag => <Select.Option key={tag.id}>{tag.name}</Select.Option>)}
            </Select>)
          }
        </Form.Item>
        <Form.Item label=' ' colon={false}>
          {
            type === 'search' && (
              <>
                <Button type='primary' style={{ marginRight: 12 }} htmlType="submit">筛选</Button>
                <Button onClick={this.handleRest}>重置</Button>
              </>
            )
          }
          {
            type === 'create' && (
              <>
                <Button type='primary' style={{ marginRight: 12 }} htmlType="submit">确认</Button>
                <Button onClick={() => this.setState({ createFlag: false })}>取消</Button>
              </>
            )
          }
        </Form.Item>
      </Form>
    )
  }

  fetchData = async ({ type }) => {
    if (type === 'projects') {
      const lists = Projects
      // const res = await reqProjects()
      if ('res.status===0') {
        this.setState({ projects: lists, loading: false })
      } else {
        message.error('result.msg')
      }
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.fetchData({ type: 'projects' })
  }

  render() {
    const { projects, drawerVisible, proId, editable, createFlag, loading, showDelModal } = this.state

    return (
      <div className={s.project}>
        {
          this.renderForm('search')
        }

        <div>
          {
            createFlag
              ? (this.renderForm('create'))
              : (<Button type='primary' className={s.addBtn} onClick={() => this.setState({ createFlag: true })}>新建项目</Button>)
          }
        </div>

        <Table
          bordered
          loading={loading}
          dataSource={projects}
          columns={this.columns}
          rowKey='id'
          pagination />

        {
          drawerVisible && (
            <DrawContainer
              type='Project'
              editable={editable}
              id={proId}
              visible={drawerVisible}
              closeDrawer={this.closeDrawer} />
          )
        }

        {
          showDelModal && this.renderModal(showDelModal)
        }
      </div>
    )
  }
}

export default Form.create({})(Project)
