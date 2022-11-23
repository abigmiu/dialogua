<!-- 章节详情 -->
<template>
    <van-nav-bar :immediate-check="false" :fixed="true" :title="detail.title" left-text="返回" left-arrow
        @click-left="onClickLeft"></van-nav-bar>
    <div style="height: var(--van-nav-bar-height)"></div>
    <van-list v-model.loading="pageLoading" @load="fetchSection" :finished="pageFinished" finished-text="本章已完结">
        <section-item v-for="item in detailSectionList" :key="item.id" :source="item"></section-item>
    </van-list>
</template>
<script lang="ts" setup>
import type { IChapterResponse } from '@/types/Chapter';
import type { IPageData } from '@/types/Base';
import type { ISectionItemResponse, ISectionItemResponseWithRole } from '@/types/Section';

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import SectionItem from './components/SectionItem.vue';

import { http } from '@/utils/http';

import { storeToRefs } from 'pinia'
import { useRoleStore } from '@/store/role';
import { useDialogStore } from '@/store/chapter';

const props = defineProps<{
    bookId: string;
    id: string
}>()
const router = useRouter();

// 仓库
const roleStore = useRoleStore()
const dialogStore = useDialogStore()
const { detailSectionList } = storeToRefs(dialogStore)

const detail = ref<IChapterResponse>({
    id: 0,
    title: '标题'
})

/** 获取详情 */
const fetchDetail = async () => {
    detail.value = await http.get<IChapterResponse>(`chapter/${props.id}`);
}
/** 获取角色 */
const fetchRoles = async () => {
    pageLoading.value = true;
    try {
        const res = await roleStore.fetchRoleList(props.bookId);
        return res;
    } finally {
        pageLoading.value = false;
    }
}

let queryData = {
    page: 0,
    size: 20,
}
const pageLoading = ref(false)
const pageFinished = ref(false)
/**  分页获取对话 */
const fetchSection = async (prev = false) => {
    if (pageLoading.value) return;
    if (prev && queryData.page <= 1) return;
    const query = {
        ...queryData,
        page: prev ? queryData.page - 1 : queryData.page + 1
    }
    pageLoading.value = true;

    try {
        const res = await http.get<IPageData<ISectionItemResponse>>(`section/page/${props.id}`, {
            params: query,
        })
        const handledData = mathcRoles(res.content);
        if (prev) {
            dialogStore.detailSectionList.unshift(...handledData)
        } else {
            dialogStore.detailSectionList.push(...handledData)
        }

        if (dialogStore.detailSectionList.length >= res.total) {
            pageFinished.value = true;
        }
        queryData = query;
    } finally {
        pageLoading.value = false
    }

}

onMounted(async () => {
    fetchDetail();
    await fetchRoles()
    dialogStore.dialogList = [];
    fetchSection();
})

const onClickLeft = () => {
    router.back();
}

/** 匹配角色 */
const mathcRoles = (data: ISectionItemResponse[]) => {
    const roleList = roleStore.roleList;
    return data.map((item) => {
        const obj: ISectionItemResponseWithRole = {
            ...item,
            roleAvatar: '',
            roleName: '',
            side: 0,
        }
        if (obj.roleId !== 0) {
            const index = roleList.findIndex(role => role.id === obj.roleId);
            obj.roleAvatar = roleList[index].avatar;
            obj.roleName = roleList[index].name;
        }

        return obj;
    })
}
</script>