import Vue from 'vue'
import Router from 'vue-router'
import ActivityBack from '@/components/ActivityBack/index'
import UserInfoBack from '@/components/UserInfoBack/index'
import AboutMe from '@/components/AboutMe'
import LoginBack from "@/components/LoginBack";
import PlatForm from '@/components/PlatForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginBack',
      component: LoginBack
    },
    {
      path: '/PlatForm',
      component: PlatForm,
      children: [{
        path: '/ActivityBack',
        name: 'ActivityBack',
        component: ActivityBack
      },
        {
          path: '/UserInfoBack',
          name: 'UserInfoBack',
          component: UserInfoBack
        }, {
          path: '/AboutMe',
          name: 'AboutMe',
          component: AboutMe
        }]
    },
  ]
})
