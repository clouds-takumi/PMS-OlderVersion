export default [
    {
        id: 1,
        name: '概览',
        icon: 'home',
        path: '/p/p1'
    },
    {
        id: 2,
        name: '项目',
        icon: 'project',
        path: '/p/p1/project'
    },
    {
        id: 3,
        name: '迭代',
        icon: 'build',
        path: '/p/p1/iteration'
    },
    {
        id: 4,
        name: '待规划',
        icon: 'block',
        path: '/p/p1/backlog'
    },
    {
        id: 5,
        name: '事项',
        icon: 'filter',
        path: '/p/p1/issues'
    },
    {
        id: 6,
        name: '系统',
        icon: 'setting',
        path: '/p/p1/system',
        children: [
            {
                id: 7,
                name: '标签管理',
                path: '/p/p1/system/tag'
            },
            {
                id: 8,
                name: '用户管理',
                path: '/p/p1/system/user'
            }
        ]
    }
]