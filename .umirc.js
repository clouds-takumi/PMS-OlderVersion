
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/login' },
        { path: '/login', component: '../pages/login' },
        { path: '/register', component: '../pages/register' },
        { path: '/user', component: '../pages/user' },
        { path: '/user/projects', component: '../pages/user/projects' },
        { path: '/p/p1', component: '../pages/backlog' },
        { path: '/p/p1/project', component: '../pages/project' },
        { path: '/p/p1/backlog', component: '../pages/backlog' },
        { path: '/p/p1/backlog/issues/:id', component: '../pages/backlog' },
        // { path: '/detail/:id', component: '../pages/detail' },
        { path: '/p/p1/iteration', component: '../pages/iteration' },
        { path: '/p/p1/issues', component: '../pages/issues' },
        // { path: '/p/p1/system/user', component: '../pages/system/user' },
        { path: '/p/p1/system/tag', component: '../pages/system/tag' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'pms',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
