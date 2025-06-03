import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import Login from '../views/LoginView.vue';

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue'), meta: { requiresAuth: true } },
  { path: '/clientes', component: () => import('../views/ClientesView.vue'), meta: { requiresAuth: true } },
  { path: '/personal', component: () => import('../views/PersonalView.vue'), meta: { requiresAuth: true } },
  { path: '/arreglos', component: () => import('../views/ArreglosView.vue'), meta: { requiresAuth: true } },
  { path: '/pedidos', component: () => import('../views/PedidosView.vue'), meta: { requiresAuth: true } },

  // Reportes
  { path: '/reporte-clientes', component: () => import('../views/ReporteClientesView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-personal', component: () => import('../views/ReportePersonalView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-pedidos-fecha', component: () => import('../views/ReportePedidosFechaView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-pedidos-entregados', component: () => import('../views/ReportePedidosEntregadosView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-pedidos-pagados', component: () => import('../views/ReportePedidosPagadosView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-pedidos-por-personal', component: () => import('../views/ReportePedidosPorPersonalView.vue'), meta: { requiresAuth: true } },
  { path: '/reporte-arreglos', component: () => import('../views/ReporteArreglosView.vue'), meta: { requiresAuth: true } },

  // Login
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, _, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else if (to.path === '/login' && user) {
    next('/');
  } else {
    next();
  }
});

export default router;
