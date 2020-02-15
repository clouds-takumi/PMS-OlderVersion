export  const iterations = [...Array(24).keys()].map(i => ({
    id: i,
    name: `iteration-${i}`,
    created: `Jason`,
    deadline: '2020/03/03',
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