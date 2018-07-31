import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/Home'
import Home from '@/views/Home/Home'
import BattleHall from '@/views/BattleHall/BattleHall'
import PersonalBattle from '@/views/Home/PersonalBattle'
import ExpertDetail from '@/views/Home/expertDetail'
import BattleSetting from '@/views/BattleHall/BattleSetting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeIndex,
      redirect:'/home/home',
      meta:{
        index:0
      },
      children:[
        {
          path: 'personalbattle',
          name: 'personalBattle',
          component: PersonalBattle,
          meta:{
            index:1,
            transform:'battle'
          }
        },
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta:{
            index:0,
            transform:'home'
          }
        },
        {
          path: 'expertDetail',
          name: 'expertDetail',
          component: ExpertDetail,
          meta:{
            index:1
          }
        }

      ]

    },
    {
      path: '/battlehall',
      name: 'BattleHall',
      component: BattleHall,
      children:[{
        path: 'battlesetting',
        name: 'BattleSetting',
        component: BattleSetting
      }]


    },
    {
      path: '/battle',
      name: 'hall',
      component: Home,

    },
    {
      path: '/battle',
      name: 'perosonal',
      component: Home
    }


  ]
})
