import {createRouter, createWebHistory} from 'vue-router'

import Home from "../views/Home";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Apps/',
        name: 'Apps',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Apps.vue'),
        children:[
            {
              path: '',
              name: 'AppsHome',
              component: () => import('../components/Apps/AppsHome')
            },
            {
                path: 'WeatherApp',
                name: 'WeatherApp',
                component: () => import('../components/Apps/WeatherApp')
            },
            {
                path: 'HashTableApp',
                name: 'HashTableApp',
                component: () =>import('../components/Apps/HashTableVisualApp/HashTableVisualApp')
            },
            {
                path: 'MultidimensionalUtilityApp',
                name: 'MultidimensionalUtilityApp',
                component: () => import('../components/Apps/MultidimensionalUtilityApp/MultidimensionalUtilityApp')
            },
            {
                path: 'ClashStatsApp',
                name: 'ClashStatsApp',
                component: () => import('../components/Apps/ClashRoyaleStatsApp/ClashRoyaleStatsApp')
            }
        ]
    },
    {
        path: '/Settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
    },

    //Приложения

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
