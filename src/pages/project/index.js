// import DraggableContainer from '../../components/draggable_container'

// export default function (props) {
//   return <DraggableContainer />
// }
import { Component } from 'react'
import { Table, Tag, Divider, Form, Select, Button, Input, DatePicker } from 'antd'
import s from './index.less'
import DrawContainer from '../../components/drawer_container'

const projects = [...Array(15).keys()].map(i => ({
  id: i,
  name: `project-${i}`,
  created: `Jason`,
  startDate: '2020/02/03',
  endDate: '2020/03/03',
  status: Math.floor(Math.random() * 3),
  tags: i % 2 === 0 ? ['电商', '支付'] : ['教育', '网课', '学习']
}))
const colors = {
  0: 'blue',
  1: 'orange',
  2: 'red',
}
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
const tagOptions = [
  {
    id: 0,
    name: '电商',
  },
  {
    id: 1,
    name: '支付',
  },
  {
    id: 2,
    name: '教育',
  },
  {
    id: 3,
    name: '网课',
  },
  {
    id: 4,
    name: '学习',
  },
]
const createdOptions = [
  {
    id: 0,
    name: 'Jason',
  },
  {
    id: 1,
    name: 'Jane',
  }
]

class Project extends Component {
  state = {
    drawerVisible: false,
    proName: '',
    projects,
    columns: [
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
        dataIndex: 'operate',
        key: 'operate',
        render: () => {
          return (
            <>
              <span className={s.operate}>编辑</span>
              <Divider type='vertical' />
              <span className={s.operate}>删除</span>
            </>
          )
        }
      },
    ]
  }

  showDrawer = (dataIndex) => {
    // TODO
    this.setState({ drawerVisible: true })
  }

  closeDrawer = () => this.setState({ drawerVisible: false })

  render() {
    const { projects, columns } = this.state

    return (
      <div className={s.project}>
        <Form layout='inline' style={{ marginBottom: 24 }}>
          <Form.Item label='名称'>
            <Input placeholder='请输入项目名称' />
          </Form.Item>
          <Form.Item label='项目状态'>
            <Select placeholder='请选择' style={{ width: 140 }}>
              {statusOptions.map(status => <Select.Option key={status.id}>{status.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='项目日期'>
            <DatePicker />
          </Form.Item>
          <Form.Item label='创建人'>
            <Select placeholder='请选择' style={{ width: 140 }}>
              {createdOptions.map(created => <Select.Option key={created.id}>{created.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='标签'>
            <Select placeholder='请选择' style={{ width: 140 }}>
              {tagOptions.map(tag => <Select.Option key={tag.id}>{tag.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label=' ' colon={false}>
            <Button type='primary' style={{ marginRight: 12 }}>筛选</Button>
            <Button>重置</Button>
          </Form.Item>
        </Form>
        <Table
          dataSource={projects}
          columns={columns}
          rowKey='id'
          pagination />
        {
          this.state.drawerVisible &&
          <DrawContainer
            type='Project'
            id={this.state.proName}
            visible={this.state.drawerVisible}
            closeDrawer={this.closeDrawer} />
        }
      </div>
    )
  }
}

export default Form.create({})(Project)
