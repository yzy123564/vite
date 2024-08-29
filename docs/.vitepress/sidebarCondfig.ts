
// docs/.vitepress/relaConf/navbar.ts
import { DefaultTheme } from 'vitepress';
export const sidebar: DefaultTheme.Sidebar = {
    // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置
    '/bug/':[

    ],
    '/java/SpringBoot/template/':[
        {
            text: 'SpringBoot集成thymeleaf',
            items: [
                {
                    text: '集成thymeleaf',
                    link: '/java/SpringBoot/template/thymeleaf'
                },
                {
                    text: 'thymeleaf模板语法',
                   link: '/java/SpringBoot/template/thymeleaf01'
                }
            ]
        },
        {
            text: 'SpringBoot集成Freemarker',
            items: [
                {
                    text: '集成Freemarker',
                    link: '/java/SpringBoot/template/freemarker'
                },
                {
                    text: 'SpringBoot集成模板-使用Freemarker',
                    link: '/java/SpringBoot/template/freemarker01'
                }
            ]
        }
    ],
    '/java/springbootWebSocket/':[
        {
            text: 'SpringBoot集成WebSocket',
            items: [
                {
                    text: 'SpringBoot集成WebSocket的三种方式',
                    link: '/java/springbootWebSocket/index'
                },
                {
                    text: 'WebSocket介绍',
                    link: '/java/springbootWebSocket/WebSocket'
                },
                {
                    text: 'STOMP',
                    link: '/java/springbootWebSocket/STOMP'
                },
                {
                    text: 'STOMP和WebSocket的关系',
                    link: '/java/springbootWebSocket/STOMP和WebSocket的关系'
                }
            ]
        }
    ],
    '/column/Algorithm/': [
        // 第一部分
        {
            text: '栈和队列',
            items: [
                {
                    text: '栈-深拷贝和浅拷贝',
                    link: '/column/Algorithm/001_Stack'
                },
                {
                    text: '队列-事件循环',
                    link: '/column/Algorithm/002_Queue'
                }
            ]
        },
        // 第二部分
        {
            text: '字典和树',
            items: [
                {
                    text: '字典和集合-Set和Map',
                    link: '/column/Algorithm/003_Dictionary'
                },
                {
                    text: '树-深/广度优先遍历',
                    link: '/column/Algorithm/004_Tree'
                }
            ]
        }
    ]
};
