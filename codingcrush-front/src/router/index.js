import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import VisitedProfile from '../views/VisitedProfile'
import AddQuizz from '../views/AddQuizz'
import AnswerQuizz from '../views/AnswerQuizz'

/*
import login from '../components/login.vue'
import signup from '../components/signup.vue'
*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/editprofile',
    name: 'editProfile',
    component: EditProfile
  },
  {
    path: '/profile/:id',
    name: 'visitedProfile',
    component: VisitedProfile,
    props: { default: true, sidebar: false }
  },
  {
    path: '/addquizz',
    name: 'addQuizz',
    component: AddQuizz
  },
  {
    path: '/answerquizz/:id',
    name: 'answerQuizz',
    component: AnswerQuizz,
    props: { default: true, sidebar: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
