<!-- 创建章节 -->
<template>
    <div>
        <van-nav-bar>
            <template #left>
                <close-small theme="outline" size="24" fill="#333" />
                <div class="info">
                    <div class="title">第一话</div>
                    <div class="status">未发布 0字</div>
                </div>
            </template>
            <template #right>
                <more-icon theme="outline" size="24" fill="#333" />
            </template>
        </van-nav-bar>

        <div class="list">
            <dialog-item
                v-for="item in dataList"
                :key="item.id"
                :source="item"
            ></dialog-item>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { More as MoreIcon, CloseSmall } from '@icon-park/vue-next';
import DialogItem from './components/DialogItem.vue';
import { IDialog } from '@/types/Dialog';

const dataList = ref<IDialog[]>([
    {
        id: 1,
        roleName: '角色1',
        roleId: 1,
        roleAvatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        side: 'left',
        type: 'text',
        content: '内容1',
    },
    {
        id: 3,
        roleId: 0,
        roleName: '',
        roleAvatar: '',
        type: 'voiceover',
        content: '213123',
    },
    {
        id: 2,
        roleName: '角色2',
        roleId: 1,
        roleAvatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        side: 'left',
        type: 'voice',
        content: '内容2',
        duration: 1231,
    },
    {
        id: 4,
        roleName: '角色2',
        roleId: 1,
        roleAvatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        side: 'right',
        type: 'voice',
        content: '内容2',
        duration: 123312311,
    },
]);
</script>
<style lang="scss" scoped>
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
</style>
