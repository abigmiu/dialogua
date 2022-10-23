import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/HomePage.vue'),
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/user/UserPage.vue'),
            },
        ],
    },
    {
        path: '/create-book',
        name: 'CreateBook',
        component: () => import('@/views/createBook/Index.vue'),
    },
    {
        path: '/create-role/:bookId',
        name: 'CreateRole',
        component: () => import('@/views/createBook/CreateRole.vue'),
    },
    {
        path: '/create-chapter',
        name: 'CreateChapter',
        component: () => import('@/views/createChapter/Index.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/login/Register.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
