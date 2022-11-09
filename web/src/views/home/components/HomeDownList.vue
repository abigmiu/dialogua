<template>
    <VanList v-model:loading="fetchLoading" :finished="finished" @load="fecthList">
        <VanCell v-for="item in list" :key="item.id" @click="onDetail(item.id)">
            <div class="book-item">
                <div class="cover">
                    <img :src="item.cover" alt="">
                </div>
                <div class="book-info">
                    <div class="title">{{ item.title }}</div>

                    <div class="intro">{{ item.intro }}</div>
                </div>
            </div>
        </VanCell>
    </VanList>
</template>
<script lang="ts" setup>
import { IBook } from '@/types/Book';
import { http } from '@/utils/http';
import { onMounted, reactive, ref, onActivated } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const queryData = {
    lastId: 0,
    size: 10,
}
const list = reactive<IBook[]>([])

const fetchLoading = ref(false)
const finished = ref(false)
const fecthList = async () => {
    try {
        const res = await http.get<IBook[]>('book', {
            params: queryData,
        })
        if (!res.length) {
            finished.value = true;
            return;
        }

        list.push(...res)
        queryData.lastId = res[res.length - 1].id
    } finally {
        fetchLoading.value = false;
    }
}

const onDetail = (id: number) => {
    router.push({
        name: 'BookDetail',
        params: {
            id: id.toString(),
        }
    })
}

onMounted(() => {
    console.log('onMounted')
})
onActivated(() => {
    console.log('abnc');
})

</script>
<style lang="scss"  scoped>
.book-item {
    display: flex;
    overflow: hidden;

    .cover {
        height: 120px;
        width: 90px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .book-info {
        margin-left: 20px;
        flex: 1;
        overflow: hidden;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
    }

    .intro {
        margin-top: 20px;
        font-size: 12px;
        line-height: 16px;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 5;
    }
}
</style>