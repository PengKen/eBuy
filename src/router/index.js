import Vue from 'vue'
import Router from 'vue-router'
import HomeIndex from '@/views/Home'
import Home from '@/views/Home/Home'
import BattleHall from '@/views/BattleHall/BattleHall'
import PersonalBattle from '@/views/Home/PersonalBattle'
import Rule from '@/views/Home/Rule'
import ExpertDetail from '@/views/Home/expertDetail'
import BattleSetting from '@/views/BattleHall/BattleSetting'

import My from '@/views/My/My'
import MyMessage from '@/views/My/MyMessage'
import MyBattles from '@/views/My/MyBattles'
import MyFocus from '@/views/My/MyFocus'
import menu from '@/views/My/menu'
import KLine from '@/components/KLine'
// import KLine from '@/components/KLine'
import BattleIndex from '@/views/Battle/Index'
import Battle from '@/views/Battle/Battle'
import ProductDetail from '@/views/Battle/ProductDetail'
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
        },
        {
          path: 'rule',
          name: 'rule',
          component: Rule,
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
      name: 'BattleIndex',
      component: BattleIndex,
      redirect: '/battle/battle',
      meta: {index: 0},
      children: [
        {
          path: 'battle',
          name: 'Battle',
          component: Battle,
          meta: {index: 0}
        },
        {
          path: 'productdetail',
          name: 'ProductDetail',
          component: ProductDetail,
          meta: {index: 1}
        },
      ]
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      redirect:'/my/menu',
      meta: {index: 0},
      children: [
        {

          path: 'message',
          name: 'MyMessage',
          component : MyMessage,
          meta: {index: 1}
        },
        {

          path: 'menu',
          name: 'menu',
          component : menu,
          meta: {index: 0}
        },
        {

          path: 'battles',
          name: 'MyBattles',
          component : MyBattles,
          meta: {index: 1}
        },
        {

          path: 'focus',
          name: 'MyFocus',
          component : MyFocus,
          meta: {index: 1}
        }
      ]
    }

  ]
})
