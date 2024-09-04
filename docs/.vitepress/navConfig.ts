import { DefaultTheme } from 'vitepress';


// https://vitepress.dev/reference/site-config
export const nav: DefaultTheme.NavItem[] = [

    {
        text: '首页',
        link: '/'
    },

//===================TestDemo======================
    {
        text: '前端开发',
        items: [
            {
                text: '数据结构与算法',
                link: '/column/Algorithm/'
            }
        ]
    },



    //===================CSharp=========================

    //===================CSharp=========================

    //===================JavaScript======================
    {
        text: 'Mysql',
        items: [
            {
                text: 'Mysql 8.0数据导入到5.7版本中',
                link: '/mysql/mysql8to5.md'
            }
        ]
    },
    //===================JavaScript======================


    //===================Java======================
    {
        text: 'Java',
        items: [

            {
                text: 'SpringBoot集成WebSocket的三种方式',
                link: '/java/springbootWebSocket/'
            },
            {
                text: 'SpringBoot集成模板',
                link: '/java/SpringBoot/template/'
            },
        ]
    },
    //===================Java======================
    {
        text: '奇怪的BUG',
        items: [
            {
                text: 'springboot全局配置Jackson未生效的BUG',
                link: '/bug/springbootJackSon.md'
            }
        ]
    },

    //===================Python======================
    {
        text: 'Python',
        items: [
            {
                text: 'Python玩OpenCV也是有一手的！',
                link: 'column/Python/Python玩OpenCV也是有一手的！'
            },
            {
                text: '你对象不会也在学测试吧',
                link: 'column/Python/你对象不会也在学测试吧'
            },
        ]
    },
    //===================Python======================



    //===================Link======================
    /*{
        text: '关于我',
        items: [
            { text: 'Github', link: 'https://github.com/Jacqueline712' },
            {
                text: '掘金',
                link: 'https://juejin.cn/user/3131845139247960/posts'
            },
            {
                text: '飞书社区',
                link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
            },
            {
                text: '知乎',
                link: 'https://www.zhihu.com/people/zheng-zi-ji-67-89/posts'
            }
        ]
    }*/
    //===================Link======================
];
