import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView }
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
