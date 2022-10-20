<template>
    <div class="user-book">
        <div class="flex justify-between">
            <span>我的作品</span>
        </div>
        <div class="book-list">
            <van-loading v-if="loading"></van-loading>
            <div class="book-list__item"
                v-for="item in data"
                :key="item.id"
            >
                <div class="cover">

                </div>
                <div class="title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { IBook } from "@/types/Book";
import { http } from '@/utils/http';
import { useRequest } from 'vue-request';

const fetchData = http.get<IBook[]>('book/user')
const { data, loading } = useRequest(fetchData)

</script>
<style lang="scss" scoped>
.user-book {
    margin-top: 20px;
    font-size: 14px;
}
</style>
