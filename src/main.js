import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import '@placetopay/spartan-vue/style.css';
import './style.css'
import App from './App.vue';
import Welcome from './components/Welcome.vue';

const routes = [
  {
    path: '/', component: Welcome,
  },
  {
    path: '/bcr', component: () => import('./pages/Bcr.vue'),
  },
  {
    path: '/honduras', component: () => import('./pages/Honduras.vue'),
  },
  {
    path: '/ecuador', component: () => import('./pages/Ecuador.vue'),
  },
  {
    path: '/davivienda', component: () => import('./pages/Davivienda.vue'),
  },
  {
    path: '/belize', component: () => import('./pages/Belize.vue'),
  },
  {
    path: '/uruguay', component: () => import('./pages/Uruguay.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/NotFound.vue'),
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)

app.mount('#app');

