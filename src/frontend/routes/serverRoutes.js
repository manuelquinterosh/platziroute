import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import Player from '../Player';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/register',
    component: Register,
  },
  {
    exact: true,
    path: '/player/:id',
    component: Player,
  },
  {
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;
