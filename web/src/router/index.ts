import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/HomePage.vue'),
    },
    {
        path: '/create-book',
        name: 'CreateBook',
        component: () => import('@/views/createBook/Index.vue'),
    },
    {
        path: '/create-role',
        name: 'CreateRole',
        component: () => import('@/views/createBook/CreateRole.vue'),
    },
    {
        path: '/create-chapter',
        name: 'CreateChapter',
        component: () => import('@/views/createChapter/Index.vue'),
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
