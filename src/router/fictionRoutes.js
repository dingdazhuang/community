import FictionIndex from '@/views/fiction/Index'
import Original from '@/views/fiction/index/Original'
import Relative from '@/views/fiction/index/Relative'
import Rank from '@/views/fiction/index/Rank'
import Complete from '@/views/fiction/index/Complete'

import Recommend from '@/views/fiction/Recommend'
import Article from '@/views/fiction/Article'
import FictionInfo from '@/views/fiction/FictionInfo'
import NovelList from '@/views/fiction/NovelList'
import Chapter from '@/views/fiction/Chapter'

export const fictionRoutes = [
    {
        path: '/fiction', component:　FictionIndex,
        children: [
            {
                path:　'',
                name: '原创',
                component: Original
            },
            {
                path: 'relative',
                name: '同人',
                component: Relative
            },
            {
                path: 'complete',
                name: '完结',
                component: Complete
            },
            {
                path: 'rank',
                name: '排行',
                component: Rank
            }
        ]
    },
    {
        path: '/fiction/recommend',
        name: '推文/书单',
        component: Recommend
    },
    {
        path: '/fiction/article/:articleId',
        name: 'fiction-article',
        component: Article
    },
    {
        path: '/fiction/info/:fictionId/:novelName',
        name: '小说详情',
        component: FictionInfo
    },
    {
        path: '/fiction/novel_list/:novelId/:novelName',
        name: '小说目录',
        component: NovelList
    },
    {
        path: '/fiction/chapter/:chapterId',
        name: 'chapter',
        component: Chapter
    },
]