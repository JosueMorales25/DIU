import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title: 'Página de Inicio'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      title: 'Semestres'
    }
  },
  {
    path: '/about/:materia_id',
    name: 'materia',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Materias.vue'),
    props: (route) => ({
      materia_id: route.params.materia_id,
      materia_nombre: route.query.nombre
    }),
    meta: {
      title: (route) => `${route.query.nombre} - Nombre de tu Aplicación`
    }
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Nosotros.vue'),
    meta:{
      title:'Nosotros'
    }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
    ? typeof to.meta.title === 'function'
      ? to.meta.title(to)
      : to.meta.title
    : 'Título por Defecto';
  document.title = title;
  next();
});

export default router
