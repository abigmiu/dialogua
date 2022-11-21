<!-- 章节详情 -->
<template>
    <van-nav-bar :title="detail.title" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="list"></div>
</template>
<script lang="ts" setup>
import type { IChapterResponse } from '@/types/Chapter';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import { http } from '@/utils/http';
import { IPageData } from '@/types/Base';
import { ISectionItemResponse } from '@/types/Section';
import { IRole } from '@/types/Role';

const props = defineProps<{
    bookId: string;
    id: string
}>()
const router = useRouter();

const detail = ref<IChapterResponse>({
    id: 0,
    title: '标题'
})

const fetchDetail = async () => {
    detail.value = await http.get<IChapterResponse>(`chapter/${props.id}`);
}
const fetchRoles = async () => {
    const res = await http.get<IRole[]>(`book-role/list/${props.bookId}`);
}
let queryData = {
    page: 0,
    size: 20,
}
const fetchSection = async () => {
    const query = {
        ...queryData,
        page: queryData.page + 1
    }
    const res = await http.get<IPageData<ISectionItemResponse>>(`section/page/${props.id}`, {
        params: query,
    })
    queryData = query;
}

onMounted(async () => {
    fetchDetail();
    await fetchRoles()
    fetchSection();
})

const onClickLeft = () => {
    router.back();
}
</script>