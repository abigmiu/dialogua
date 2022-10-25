<template>
    书本详情{{ id }}

    <div v-for="item in data" :key="item.id" @click="onJumpDetail(item.id)">{{ item.title }}</div>

    <van-button type="primary" :loading="createLoading" @click="onCreateBtn">创建新章节</van-button>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useRequest } from 'vue-request';
import { http } from '@/utils/http';
import { IBook, ICreateBook, ICreateBookResponse } from '@/types/Book';

const router = useRouter();

const props = defineProps<{
    id: string
}>();

const fetchData = () => http.get<IBook[]>(`chapter/list/${props.id}`)
const { data } = useRequest(fetchData)

const create = (data: ICreateBook) => http.post<ICreateBookResponse>(`chapter/${props.id}`, data)
const { loading: createLoading, run: runCreate } = useRequest(create, {
    manual: true,
});

const onCreateBtn = async () => {
    const data: ICreateBook = {
        title: '标题'
    }
    const res = await runCreate(data);
    if (res) {
        onJumpDetail(res.id)
    }
}

const onJumpDetail = (chapterId: number) => {
    router.push({
        name: 'CreateChapter',
        params: {
            bookId: props.id,
            chapterId: chapterId.toString(),
        },
    });
}

</script>

<style scoped>

</style>