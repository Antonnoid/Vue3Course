import MainPage from '@/pages/MainPage'
import PostsPage from '@/pages/PostsPage'
import About from '@/pages/About'
import PostCard from '@/pages/PostCard'
import PostsPageWithStore from '@/pages/PostsPageWithStore'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi'
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
path: '/',
component: MainPage
},
{
  path: '/posts',
  component: PostsPage
  },
  {
    path: '/about',
    component: About
    },
    {
      path: '/posts/:id',
      component: PostCard
      },
      {
path: '/store',
component: PostsPageWithStore,
      },
      {
        path: '/composition',
        component: PostPageCompositionApi
      }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;