module.exports = {
    title: '/etc/openjny',
    description: "OpenJNY's Blog",
    locales: {
        '/': {
            lang: 'ja-JP',
        },
    },
    // THEME
    // -----
    theme: 'meteorlxy',
    themeConfig: {
        // Language of this theme. See the [Theme Language] section below.
        lang: require('vuepress-theme-meteorlxy/lib/langs/ja-JP'),
        // Personal infomation (delete the fields if you don't have / don't want to display)
        personalInfo: {
            // Nickname
            nickname: 'OpenJNY',
            // Introduction of yourself
            description: 'Laugh and grow fat :D',
            // Email
            email: 'openjny@gmail.com',
            // Your location
            location: 'Tokyo, Japan',
            // Your organization
            // organization: 'Foo bar company.',
            // Your avatar image
            // Set to external link
            avatar: 'https://pbs.twimg.com/profile_images/1347343742362034176/JolObIwJ_400x400.jpg',
            // Or put into `.vuepress/public` directory. E.g. `.vuepress/public/img/avatar.jpg`
            // avatar: '/img/avatar.jpg',
            // Accounts of SNS
            sns: {
                // Twitter account and link
                twitter: {
                    account: 'openjny',
                    link: 'https://twitter.com/openjny',
                },
                // Github account and link
                github: {
                    account: 'openjny',
                    link: 'https://github.com/openjny',
                },
                // Facebook account and link
                // facebook: {
                //     account: 'user',
                //     link: 'https://www.facebook.com/user',
                // },
                // LinkedIn account and link
                linkedin: {
                    account: 'junya-yamaguchi',
                    link: 'https://www.linkedin.com/in/ja-junya-yamaguchi',
                },
                // Medium account and link
                // medium: {
                //     account: 'user',
                //     link: 'https://medium.com/@user',
                // },
                // GitLab account and link
                gitlab: {
                    account: 'openjny',
                    link: 'https://gitlab.com/openjny',
                },
                // Bitbucket account and link
                bitbucket: {
                    account: 'openjny',
                    link: 'https://bitbucket.org/openjny',
                },
                // Docker Hub account and link
                // docker: {
                //     account: 'openjny',
                //     link: 'https://hub.docker.com/u/openjny',
                // },
                // qiita: {
                //     account: 'openjny',
                //     link: 'https://qiita.com/openjny'
                // }
            },
        },
        // Header Config
        header: {
            // https://vuepress-theme-meteorlxy.meteorlxy.cn/posts/2019/03/23/header-config-en.html#header-image
            // The background of the header. You can choose to use an image, or to use random pattern (geopattern)
            background: {
                // URL of the background image. If you set the URL, the random pattern will not be generated, and the `useGeo` will be ignored.
                // url: '/assets/img/bg.jpg',
                // url: ['/assets/img/bg1.jpg', '/assets/img/bg2.jpg'],
                // Use random pattern. If you set it to `false`, and you don't set the image URL, the background will be blank.
                useGeo: true,
            },
            // show title in the header or not
            showTitle: true,
        },
        // Show the last updated time of your posts
        lastUpdated: true,
        // The content of your navbar links
        nav: [{
                text: 'Home',
                link: '/',
                exact: true
            },
            {
                text: 'Posts',
                link: '/posts/',
                exact: false
            },
            {
                text: 'About Me',
                link: '/about-me/',
                exact: false
            },
            {
                text: 'Qiita',
                link: 'https://qiita.com/OpenJNY'
            },
            {
                text: 'Repo',
                link: 'https://github.com/OpenJNY/openjny.github.io/tree/vuepress'
            },
        ],
        // Comments config. See the [Posts Comments] section below.
        comments: false,
        // comments: {
        //   owner: 'meteorlxy',
        //   repo: 'vuepress-theme-meteorlxy',
        //   clientId: 'MY_CLIENT_ID',
        //   clientSecret: 'MY_CLIENT_SECRET',
        // },
    },
    head: [
        ['link', {
            rel: 'icon',
            type: 'image/jpg',
            href: '/img/favicon.png'
        }],
        ['meta', {
            name: "keywords",
            content: ""
        }],
        ['meta', {
            name: "og:title",
            content: "/etc/openjny"
        }],
        ['meta', {
            name: "og:description",
            content: "OpenJNY のブログです。技術的な内容から日常的なことまで。"
        }],
        ['meta', {
            name: "og:type",
            content: "website"
        }],
        ['meta', {
            name: "og:url",
            content: "https://openjny.github.io/"
        }],
        // ['link', {
        //     rel: 'stylesheet',
        //     href: 'https://cdn.jsdelivr.net/npm/yakuhanjp@3.0.0/dist/css/yakuhanrp.min.css'
        // }],
        ['link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/earlyaccess/mplus1p.css'
        }],
        // for markdown-it-katex
        ['link', {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css'
        }]
    ],
    markdown: {
        lineNumbers: false,
        linkify: true,
        // options for markdown-it-toc
        // toc: {
        //     includeLevel: [2, 3]
        // },
        extendMarkdown: md => {
            md.use(require('@iktakahiro/markdown-it-katex'), {
                throwOnError: false,
                errorColor: "#cc0000",
                macros: {
                    '\\Z': '\\mathbb{Z}',
                    '*': '\\times'
                }
            })
            md.use(require('markdown-it-footnote'))
            md.use(require('markdown-it-deflist'))
        }
    },
    plugins: [
        // ['vuepress-plugin-mathjax', {
        //     throwOnError: false,
        //     errorColor: "#cc0000",
        //     target: 'svg',
        //     macros: {
        //         '*': '\\times',
        //         '\\Z': '\\mathbb{Z}',
        //     },
        // }],
        ['container', {
            type: 'vue',
            before: '<pre class="vue-container"><code>',
            after: '</code></pre>'
        }],
        ['container', {
            type: 'ref',
            defaultTitle: 'Reference',
            before: '<div class="custom-block reference">',
            after: '</div>'
        }],
    ]
};
