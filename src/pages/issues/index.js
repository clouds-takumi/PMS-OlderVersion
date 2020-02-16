import { PureComponent, Fragment } from 'react'
import s from './index.less'
import { Table, Tag, Menu, Dropdown, Icon } from 'antd'
import DrawContainer from '../../components/drawer_container'
import { iterations, statusColorMap, statusMap, statuOptions } from './mock-data'

class Issue extends PureComponent {
    state = {
        loading: false,
        id: null,
        drawerVisible: false,
        iterations,
        columns: [
            {
                title: '事项名称',
                dataIndex: 'name',
                key: 'name',
                width: 120,
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

    renderAdd = () => {
        return <div className={s.addIss} onClick={this.addNewIssue}>添加事项</div>
    }

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

    render() {
        const { iterations, columns } = this.state
        return (
            <div>
                <div className={s.iterRoot}>
                    <Table
                        className={s.table}
                        dataSource={iterations}
                        columns={columns}
                        rowKey='id'
                        title={this.renderAdd}
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
export default Issue