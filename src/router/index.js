import {createRouter, createWebHistory} from 'vue-router'

import Home from "../views/Home";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Apps',
        name: 'Apps',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Apps.vue')
    },
    {
        path: '/Info',
        name: 'Info',
        component: () => import(/* webpackChunkName: "about" */ '../views/Info.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
