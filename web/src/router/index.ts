import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/HomePage.vue'),
        redirect: {
            name: 'Home.List'
        },
        children: [
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/user/UserPage.vue'),
            },
            {
                path: 'list',
                name: 'Home.List',
                component: () => import('@/views/home/HomeList.vue')
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
        props: true,
        name: 'CreateRole',
        component: () => import('@/views/createBook/CreateRole.vue'),
    },
    {
        path: '/create-chapter/:bookId/:chapterId',
        name: 'CreateChapter',
        props: true,
        component: () => import('@/views/createChapter/Index.vue'),
    },
    {
        path: '/chapter-detail/:bookId/:id',
        props: true,
        name: 'ChapterDetail',
        component: () => import('@/views/book/chapterDetail.vue'),
    },
    {
        path: '/book/detail/:id',
        name: 'BookDetail',
        props: true,
        component: () => import('@/views/book/bookDetail.vue'),
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
