import { Home } from './pages/Home.jsx';
import {Login} from './pages/Login.jsx'
import {SignUp} from './pages/SignUp.jsx'
import {BoardApp} from './pages/BoardApp.jsx'

export const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/board/:boardId/:groupId?/:taskId?',
    component: BoardApp
  },
  {
    path: '/board/:boardId/activity_log',
    component: BoardApp 
  },
  {
    path: '/board/',
    component: BoardApp 
  }

];
