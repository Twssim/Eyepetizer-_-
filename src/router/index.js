import Vue from 'vue'
import VueRouter from 'vue-router'
// import discover from '../components/view/discover.vue'
import recommand from '../components/view/recommand.vue'
// import videoPlay from '../components/videoPlay'
import option from '../components/option.vue'
import my from '../components/my.vue'
// import login from '../components/view//register/login.vue'
import mycollect from '../components/view/instrument/mycollect.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: option,
    children: [
      {
        path: '/',
        component: () => import("../components/view/discover.vue"),
      },
      {
        path: '/recommand',
        component: recommand
      },
      {
        path: '/dayreport',
        component: () => import("../components/view/dayreport.vue"),
      },
    ],
      meta: {
      keepAlive:true
    }
  },
  {
    path: '/videoPlay',
    component: () => import("../components/videoPlay"),
  },
  {
    path: '/my',
    component: my,
  },
  {
    path: '/login',
    component: () => import("../components/view//register/login.vue"),

  },
  {
    path: '/mycollect',
    component: mycollect
  },
  {
    path: '/person',
    component: () => import("../components/view/person-page/person.vue")
  },  {
    path:'/userAgreement',
    component:()=>import("../components/view/person-page/person-page-instrument/use-agreement.vue")
  },
  {
    path:'/privacyPolicy',
    component:()=>import("../components/view/person-page/person-page-instrument/privacy-policy.vue")
  },
  {
    path:'/VideoFeatureStatment',
    component:()=>import("../components/view/person-page/person-page-instrument/Video feature Statement.vue")
  },
  {
    path:'/HomePage',
    component:()=>import("../components/view/HomePage/HomePage.vue")
  },
  {
    path:'/ChangeMessage',
    component:()=>import("../components/view/HomePage/changeMessage/Message.vue")
  },
  {
    path:'/introduce',
    component:()=>import("../components/view/HomePage/changeMessage/introduce.vue")
  },
  {
    path:'/attection',
    component:()=>import("../components/view/instrument/myattection.vue")
  },
  {
    path:'/record',
    component:()=>import("../components/view/instrument/videoRecord.vue")
  },
  {
    path:'/search',
    component:()=> import("../components/view/Search/search.vue")
  },
  {
    path:'/dayreport',
    component:()=>import('../components/view/dayreport')
  },
  {
    path:'/videoSearch',
    component:()=>import('../components/view/Search/resultVideo.vue'),
    // meta: {
    //   keepAlive:true
    // }
  },
  {
    path:'/VideoPlay',
    component:()=>import("../components/view/dayreport/VideoPlay.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
