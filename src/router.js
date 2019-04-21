import Vue from 'vue'
import Router from 'vue-router'

//components
import home from './views/home.vue'
import lesson from './views/lesson.vue'
import course_page from './views/course_page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name: 'home',
      component: home,
      alias: '/home',
      title: '40digit education'
    },
    {
      path: '/:lang',
      props: true,
      name: 'course_page',
      component: course_page,
    },
    {
      path: '/:lang/lesson/:id',
      props: true,
      name: 'lesson',
      component: lesson,
    },
  ]
})
