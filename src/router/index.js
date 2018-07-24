import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import BattleHall from '@/views/BattleHall'
import PersonalBattle from '@/views/PersonalBattle'
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
      component: Home,

    },
    {
      path: '/battlehall',
      name: 'BattleHall',
      component: BattleHall,

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
    },
    {
      path: '/battle',
      name: 'personal',
      component: Home,

    },
    {
      path: '/personalbattle',
      name: 'personalBattle',
      component: PersonalBattle,
    }
  ]
})
