import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css'
import App from './App.vue';
import Welcome from './components/Welcome.vue';

const routes = [
  {
    path: '/', component: Welcome,
  },
  {
    path: '/pago-basico', component: () => import('./pages/PagoBasico.vue'),
  },
  {
    path: '/tokenizacion', component: () => import('./pages/Honduras.vue'),
  },
  {
    path: '/recurrencia', component: () => import('./pages/Ecuador.vue'),
  },
  {
    path: '/plugin', component: () => import('./pages/Davivienda.vue'),
  },
  {
    path: '/api-gateway', component: () => import('./pages/Belize.vue'),
  },
  {
    path: '/api-link-pago', component: () => import('./pages/Uruguay.vue'),
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

