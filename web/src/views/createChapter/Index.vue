<!-- 创建章节 -->
<template>
    <div class='create-chapter-wrapper'>
        <van-nav-bar>
            <template #left>
                <close-small theme='outline' size='24' fill='#333' @click='onClose' />
                <div class='info'>
                    <div class='title'>第一话</div>
                    <div class='status'>未发布 {{ textCount }} 字</div>
                </div>
            </template>
            <template #right>
                <more-icon theme='outline' size='24' fill='#333' />
            </template>
        </van-nav-bar>
        <div class='list-wrapper'>
            <div class='list'>
                <dialog-item
                    class='mt-4 mb-4'
                    v-for='item in dataList'
                    :key='item.id'
                    :source='item'
                ></dialog-item>
            </div>
        </div>

        <div class='footer'>
            <div
                class='insert-panel'
                v-if='isModify'
            >
                {{ modifyText }}
                <close-small
                    theme='outline'
                    fill='#333'
                    class='panel-close'
                    @click='onCloseAction'
                />
            </div>
            <content-input></content-input>
            <role-list
                :book-id='bookId'
                :chapterId="chapterId"
            ></role-list>
        </div>
    </div>
</template>
<script lang='ts' setup>
import type { ISection } from '@/types/Dialog';

import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { More as MoreIcon, CloseSmall } from '@icon-park/vue-next';
import DialogItem from './components/DialogItem.vue';
import ContentInput from './components/ContentInput.vue';
import RoleList from './components/RoleList.vue';

import { useDialogStore } from '@/store/chapter';
import { useBookStore } from '@/store/book';
import { sectionActionType } from '@/constant';

const router = useRouter();

const props = defineProps<{
    bookId: string,
    chapterId: string
}>();

const bookStore = useBookStore();
onMounted(async () => {
    const { currentBookId, currentChapterId } = bookStore;
    if (currentBookId !== props.bookId) {
        await bookStore.changeBookId(props.bookId);
    }
    if (currentChapterId !== props.chapterId) {
        await bookStore.changeChapterId(props.chapterId);
    }
})

const dialogStore = useDialogStore();
const { currentAction, textCount } = storeToRefs(dialogStore);
const dataList = computed((): ISection[] => dialogStore.$state.dialogList);

/** 编辑，插入处理 */
const modifyAction = [sectionActionType.edit, sectionActionType.upInsert, sectionActionType.downInsert];
const isModify = computed(() => {
    // @ts-ignore
    return modifyAction.includes(currentAction.value)
});
const modifyText = computed(() => {
    if (currentAction.value === sectionActionType.edit) return '修改';
    if (currentAction.value === sectionActionType.upInsert) return '上插';
    if (currentAction.value === sectionActionType.downInsert) return '下插';
    return '';
});
const onCloseAction = () => {
    dialogStore.$state.currentAction = sectionActionType.insert;
};


const onClose = () => {
    router.push({
        name: 'BookDetail',
    })
};
</script>
<style lang='scss' scoped>
.info {
    padding: 5px 0;
    line-height: 1.2;
    text-align: left;

    .title {
        font-size: 12px;
    }

    .status {
        font-size: 10px;
    }
}

.create-chapter-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .list-wrapper {
        flex: 1;
        overflow-y: scroll;
    }

    .list {
        padding: 0 10px;
    }

    .footer {
        background-color: #fff;
        padding: 10px 20px;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    }
}

.insert-panel {
    text-align: center;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    word-spacing: 5px;
    position: relative;

    .panel-close {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
}
</style>
