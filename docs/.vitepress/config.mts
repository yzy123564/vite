import { defineConfig } from 'vitepress'
import { nav } from './navConfig';
import { sidebar } from './sidebarCondfig';
export default defineConfig({
  title: "文档",
  description: "A VitePress Site",
  base: '/vite/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    search: {
      provider: "local",
      options: {
        locales: {
          '/': {
            lang: 'zh-CN', // 支持 zh-CN/zh-TW/en 等
            placeholder: '搜索所有文档' // 搜索框提示文字
          }
        },
        // 全局索引范围（可选，默认提取 h1-h3 标题 + 正文）
        // 可自定义提取的标题层级、是否包含正文等
        extractHeaders: ['h1', 'h2', 'h3', 'h4'], // 扩展索引标题层级
        includeSourceContent: true, // 索引正文内容（默认 true，全局搜索核心）
        limit: 10, // 最多显示 10 条全局结果（默认 5）,
        /*translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },*/
      },
    },
    sidebar: sidebar,
    outline: {
      level: [2, 6],
      label: '目录'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})





