import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import CatsView from '@/views/CatsView.vue';
import AddCatView from '@/views/AddCatView.vue';
import EditCatView from '@/views/EditCatView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cats',
    name: 'cats',
    component: CatsView
  },
  {
    path: '/cats/add',
    name: 'add-cat',
    component: AddCatView
  },
  {
    path: '/cats/edit/:id',
    name: 'edit-cat',
    component: EditCatView
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: NotFoundView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
