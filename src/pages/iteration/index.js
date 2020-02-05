import { PureComponent } from 'react'
import s from './index.less'
import { Table, Divider, Tag } from 'antd'
import DrawContainer from '../../components/drawer_container'


const iterations = [...Array(24).keys()].map(i => ({
    id: i,
    name: `iteration-${i}`,
    created: `Jason`,
    deadline: '2020/03/03',
    status: Math.floor(Math.random() * 3),
}))

const statusColorMap = {
    0: '#2db7f5',
    1: '#87d068',
    2: '#f50',
}

const statusMap = {
    0: '未开始',
    1: '进行中',
    2: '已完成',
}

class Iteration extends PureComponent {
    state = {
        // loading: true,
        id: null,
        drawerVisible: false,
        iterations,
        columns: [
            {
                title: '迭代名称',
                dataIndex: 'name',
                key: 'name',
                width: 120,
            },
            {
                title: '迭代状态',
                dataIndex: 'status',
                key: 'status',
                width: 120,
                render: status => <Tag color={statusColorMap[status]}>{statusMap[status]}</Tag>
            },
            {
                title: '截至日期',
                dataIndex: 'deadline',
                key: 'deadline',
                width: 120,
                render: deadline => (<div>{deadline}</div>)
            },
            {
                title: '创建人',
                dataIndex: 'created',
                key: 'created',
                width: 120,
            },
            {
                title: '操作',
                render: (iteration) => {
                    return (
                        <>
                            <span className={s.operate} onClick={() => this.showDrawer(iteration)}>编辑</span>
                            <Divider type='vertical' />
                            <span className={s.operate}>删除</span>
                        </>
                    )
                }
            },
        ]
    }

    showDrawer = (iteration) => {
        this.setState({ drawerVisible: true, id: iteration.id })
    }

    closeDrawer = () => this.setState({ drawerVisible: false })

    render() {
        const { iterations, columns } = this.state
        return (
            <div>
                <div className={s.iterRoot}>
                    <Table
                        className={s.table}
                        // loading={loading}
                        dataSource={iterations}
                        columns={columns}
                        rowKey='id'
                        // bordered
                        // title={() => 'iterations'}
                        pagination={{ total: 24, defaultPageSize: 8, showQuickJumper: true }} />
                </div>
                {
                    this.state.drawerVisible &&
                    <DrawContainer
                        type='Iteration'
                        id={this.state.id}
                        visible={this.state.drawerVisible}
                        closeDrawer={this.closeDrawer} />
                }
            </div>

        )
    }
}
export default Iteration