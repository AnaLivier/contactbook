// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact/:id',
      name: 'contact-detail',
      component: () => import('../views/ContactDetailView.vue'),
      props: true
    },
    {
      path: '/add',
      name: 'add-contact',
      component: () => import('../views/AddContactView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit-contact',
      component: () => import('../views/EditContactView.vue'),
      props: true
    }
  ]
})

export default router