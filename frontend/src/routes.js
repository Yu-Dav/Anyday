import { Home } from './pages/Home.jsx';
import {Login} from './pages/Login.jsx'
import {SignUp} from './pages/SignUp.jsx'
import {BoardApp} from './pages/BoardApp.jsx'

export const routes = [
  {
    path: '/',
    component: Home,
  },

  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path: '/board/:boardId',
    component: BoardApp ,
  },

];
