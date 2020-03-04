export const issues = [...Array(24).keys()].map(i => ({
    id: i,
    name: `iteration-${i}`,
    created: `Jason`,
    status: Math.floor(Math.random() * 3),
}))

export const statusColorMap = {
    0: '#2db7f5',
    1: '#87d068',
    2: '#f50',
}

export const statusMap = {
    0: '未开始',
    1: '进行中',
    2: '已完成',
}

export const statuOptions = [
    { id: 0, key: 0, name: '评估', event: '未开始', color: '#2db7f5' },
    { id: 1, key: 1, name: '开发', event: '进行中', color: '#87d068' },
    { id: 2, key: 2, name: '发布', event: '已完成', color: '#f50' }
]

// renderMenu = () => {
//     return (
//         <Menu className={s.menu}>
//             {
//                 statuOptions.map(statu => (
//                     <Menu.Item key={statu.key} className={s.menuItem}>
//                         <span>{statu.name}</span>
//                         <Icon type="double-right" className={s.arrow} />
//                         <Tag color={statu.color}>{statu.event}</Tag>
//                     </Menu.Item>
//                 ))
//             }
//         </Menu>
//     )
// }


// title: '需求描述',
// dataIndex: 'desc',
// key: 'desc',
// width: 120,
// render: status => (
//     <Dropdown overlay={this.renderMenu()} trigger={['click']}>
//         <div style={{ cursor: 'pointer' }}>
//             <Tag color={statusColorMap[status]} style={{ cursor: 'pointer' }}> {statusMap[status]}</Tag>
//             <Icon type="down" />
//         </div>
//     </Dropdown>
// )