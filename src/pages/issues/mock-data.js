export const iterations = [...Array(24).keys()].map(i => ({
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