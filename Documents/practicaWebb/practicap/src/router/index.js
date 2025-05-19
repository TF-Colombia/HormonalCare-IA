/**
 * @summary Router configuration for the application
 * @author Your Name
 */
import { createRouter, createWebHistory } from 'vue-router'

// Domain: Public
import HomePage from '../domains/public/pages/home-page.component.vue'
import PageNotFound from '../domains/public/pages/page-not-found.component.vue'

// Domain: Registration
import EventCheckIn from '../domains/registration/pages/event-check-in-page.component.vue'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/registration/event-check-ins/new',
        name: 'EventCheckIn',
        component: EventCheckIn
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router