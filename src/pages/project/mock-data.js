export const Projects = [...Array(12).keys()].map(i => ({
    id: i,
    name: `project-${i}`,
    created: `Jason`,
    startDate: '2020/02/03',
    endDate: '2020/03/03',
    status: Math.floor(Math.random() * 3),
    tags: i % 2 === 0 ? ['电商', '支付'] : ['教育', '网课', '学习']
}))

export const colors = {
    0: 'blue',
    1: 'orange',
    2: 'red',
}



export const tagOptions = [
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

export const createdOptions = [
    {
        id: 0,
        name: 'Jason',
    },
    {
        id: 1,
        name: 'Jane',
    }
]
