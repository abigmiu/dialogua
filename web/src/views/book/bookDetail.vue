<!--
    用户（非作者）书本详情页
-->
<!--
    TODO: 章节页用分页， 章节页逆序正序
-->

<template>
    <van-nav-bar :fixed="true" :title="bookDetail.title" left-text="返回" left-arrow
        @click-left="onClickLeft"></van-nav-bar>
    <div style="height: var(--van-nav-bar-height)"></div>
    <div class="wrapper">
        <div class="info">
            <div>
                <img :src="bookDetail.cover" alt="" class="info__cover">
            </div>
            <div class="flex-1 overflow-hidden">
                <div class="info__title">{{ bookDetail.title }}</div>
                <div class="info__name">{{ bookDetail.author }}</div>
                <div class="info__intro">{{ bookDetail.intro }}</div>
            </div>
        </div>

        <div class="list-wrapper">
            <div class="flex justify-between mb-5 items-center">
                <div class="list__title">章节列表</div>
                <sort-one class="sort-icon transform" @click="onChangeDesc"
                    :class="{ 'rotate-180': queryData.desc }"></sort-one>
            </div>

            <div class="list">
                <van-list
                    :immediate-check="false"
                v-model:loading="loading.list" :finished="loading.listFinish" @load="getChapterPager">
                    <van-cell v-for="item in chapterList" :key="item.id" @click="onJumpDetail(item.id)"
                        :value="item.title">{{ item.title }}
                    </van-cell>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, reactive, onActivated } from 'vue';
import { http } from '@/utils/http';
import { IBook } from '@/types/Book';
import { sortDirectionType } from '@/constant/index'
import { SortOne } from '@icon-park/vue-next'
import { IChapterResponse } from '@/types/Chapter';
import { IPageData } from '@/types/Base';

const router = useRouter();

const props = defineProps<{
    id: string
}>();

const queryData = reactive({
    page: 0,
    size: 20,
    desc: false,
})


const loading = reactive({
    list: false,
    detail: false,
    listFinish: false,
})
const sortDirection = sortDirectionType.positive;

// 书本数据
const bookDetail = ref<IBook>({
    id: +props.id,
    title: '标题',
    intro: '简介',
    cover: '',
    author: '',
})
const chapterList = reactive<IChapterResponse[]>([])


// 数据获取

/** 章节列表 */
const getChapterList = async () => {
    const res = await http.get<IChapterResponse[]>(`chapter/list/${props.id}`);
    chapterList.push(...res);
}
/** 分页获取章节数据 */
const getChapterPager = async () => {
    const query = {
        ...queryData,
        page: queryData.page + 1,
    }
    loading.list = true;
    try {
        const res = await http.get<IPageData<IChapterResponse>>(`chapter/page/${props.id}`, {
            params: query,
        });
        if (res.total <= chapterList.length) {
            loading.listFinish = true;
        } else {
            loading.listFinish = false;
        }
        if (res.content.length) {
            chapterList.push(...res.content);
            Object.assign(queryData, query);
        }
    } finally {
        loading.list = false;
    }

}
const getDetail = async () => {
    const res = await http.get<IBook>(`book/detail/${props.id}`);
    bookDetail.value = res;
}

const fetchAllData = () => {
    getDetail();
    chapterList.length = 0;
    queryData.page = 0;
    getChapterPager();
 
}

/** 跳转详情 */
const onJumpDetail = (chapterId: number) => {
    router.push({
        name: 'ChapterDetail',
        params: {
            bookId: props.id,
            id: chapterId.toString(),
        },
    });
}

/** 左侧返回 */
const onClickLeft = () => {
    router.back();
}

const onChangeDesc = () => {
    queryData.desc = !queryData.desc;
    queryData.page = 0;
    chapterList.length = 0;
    getChapterPager();
}

let prevId = ''
onActivated(() => {
    console.log('bookDetail onActivated');
    if (prevId !== props.id) {
        fetchAllData();
        prevId = props.id;
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 20px;

    .info {
        display: flex;

        &__cover {
            height: 160px;
            width: 120px;
            border-radius: 10px;
            margin-right: 20px;
            flex-shrink: 0;
        }

        &__title {
            font-size: 18px;
        }
    }

    .list {
        &-wrapper {
            margin-top: 20px;
        }

        &__title {
            font-size: 16px;
            font-weight: bold;
            position: relative;
            display: inline-block;

            &::after {
                content: "";
                position: absolute;
                z-index: 1;
                height: 4px;
                background-color: rgba(#43cea2, .6);
                bottom: 2px;
                left: 0;
                right: 0;
            }
        }
    }

    .sort-icon {
        font-size: 16px;
    }
}
</style>