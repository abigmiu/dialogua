import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/create-book',
        name: 'CreateBook',
        component: () => import('@/views/createBook/Index.vue'),
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/Index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
