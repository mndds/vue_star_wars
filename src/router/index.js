import Vue from 'vue'
import VueRouter from 'vue-router'
import People from '../views/People'
import ShowPeople from '../views/ShowPeople'
import FilmList from '../views/FilmList'
import ShowFilm from '../views/ShowFilm'
import StarshipsList from '../views/StarshipsList'
import ShowStarship from '../views/ShowStarship'

Vue.use(VueRouter);

const routes = [
    {
        path: '/people',
        name: 'People',
        component: People,
    },
    {   
        path: '/people/:id',
        name: 'ShowPeople',
        component: ShowPeople,
    },
    {
        path: '/films',
        name: 'FilmList',
        component: FilmList,
    },
    {
        path: '/films/:id',
        name: 'ShowFilm',
        component: ShowFilm,
    },
    {
        path: '/starships/',
        name: 'StarshipsList',
        component: StarshipsList,
    },
    {
        path: '/starships/:id',
        name: 'ShowStarship',
        component: ShowStarship,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  })
  
  export default router