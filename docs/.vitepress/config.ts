import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'TT Admin 技术文档',
  description: 'TT Admin 项目技术说明与实现细节',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '架构总览', link: '/guide/architecture' },
      { text: '前端', link: '/guide/frontend' },
      { text: '后端', link: '/guide/backend' },
      { text: '插件', link: '/guide/plugins' },
      { text: '运维', link: '/guide/operations' }
    ],
    sidebar: {
      '/guide/': [
        { text: '架构总览', link: '/guide/architecture' },
        { text: '前端设计', link: '/guide/frontend' },
        { text: '后端设计', link: '/guide/backend' },
        { text: '插件机制', link: '/guide/plugins' },
        { text: '插件开发', link: '/guide/plugin-dev' },
        { text: '插件开发', link: '/guide/plugin-dev' },
        { text: '运维与配置', link: '/guide/operations' }
      ]
    },
    outline: 'deep',
    lastUpdated: true
  }
});
