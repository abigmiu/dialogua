<template>
    <div class='user-book'>
        <div class='flex justify-between'>
            <span>我的作品</span>
        </div>
        <div class='book-list'>
            <van-loading v-if='loading'></van-loading>
            <div class='book-list__item'
                 v-for='item in data'
                 :key='item.id'
                 @click='onDetail(item.id)'
            >
                <div class='cover'>

                </div>
                <div class='title'>{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { IBook } from '@/types/Book';
import { http } from '@/utils/http';
import { useRequest } from 'vue-request';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const fetchData = () => http.get<IBook[]>('book/user');
const { data, loading, run } = useRequest(fetchData, {
    manual: true,
});

onMounted(() => {
    if (userStore.userInfo) {
        run();
    }
});


const onDetail = (id: number) => {
    router.push({
        name: 'BookDetail',
        params: {
            id: id,
        },
    });
};


</script>
<style lang='scss' scoped>
.user-book {
    margin-top: 20px;
    font-size: 14px;
}
</style>
