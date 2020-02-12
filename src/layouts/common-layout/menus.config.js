export default [
    {
        id: 1,
        name: '首页',
        icon: 'home',
        path: '/'
    },
    {
        id: 2,
        name: '项目',
        icon: 'project',
        path: '/project'
    },
    {
        id: 3,
        name: '迭代',
        icon: 'build',
        path: '/iteration'
    },
    {
        id: 4,
        name: '待规划',
        icon: 'block',
        path: '/backlog'
    },
    {
        id: 5,
        name: '事项',
        icon: 'filter',
        path: '/issues'
    },
    {
        id: 6,
        name: '系统',
        icon: 'setting',
        path: '/system',
        children: [
            {
                id: 7,
                name: '标签管理',
                path: '/system/tag'
            },
            {
                id: 8,
                name: '用户管理',
                path: '/system/user'
            }
        ]
    }
]