
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/home' },
        { path: '/login', component: '../pages/login' },
        { path: '/register', component: '../pages/register' },
        { path: '/project', component: '../pages/project' },
        { path: '/backlog', component: '../pages/backlog' },
        { path: '/backlog/issues/:id', component: '../pages/backlog' },
        { path: '/detail/:id', component: '../pages/detail' },
        { path: '/iteration', component: '../pages/iteration' },
        { path: '/issues', component: '../pages/issues' },
        { path: '/system/user', component: '../pages/system/user' },
        { path: '/system/tag', component: '../pages/system/tag' },
        { path: '/404', component: '../pages/404' },
        { path: '/offline', component: '../pages/offline' }
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
