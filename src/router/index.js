import Vue from 'vue'
import Router from 'vue-router'
import ActivityBack from '@/components/ActivityBack/index'
import UserInfoBack from '@/components/UserInfoBack/index'
import AboutMe from '@/components/AboutMe'
import LoginBack from "@/components/LoginBack";
import PlatForm from '@/components/PlatForm'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/LoginBack'
    },
    {
      path: '/LoginBack',
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

router.beforeEach((to, from, next) => {
  if (to.path === '/LoginBack') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/LoginBack');
    } else {
      next();
    }
  }
});

export default router
