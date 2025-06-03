import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import PersonalView from '../views/PersonalView.vue';
import ClientesView from '../views/ClientesView.vue';
import PedidosView from '../views/PedidosView.vue';
import ArreglosView from '../views/ArreglosView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/personal', component: PersonalView, meta: { requiresAuth: true } },
  { path: '/clientes', component: ClientesView, meta: { requiresAuth: true } },
  { path: '/pedidos', component: PedidosView, meta: { requiresAuth: true } },
  { path: '/arreglos', component: ArreglosView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
