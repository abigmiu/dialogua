<!-- 创建章节 -->
<template>
    <div class="create-chapter-wrapper">
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
        <div class="list-wrapper">
            <div class="list">
                <dialog-item
                    class="mt-4 mb-4"
                    v-for="item in dataList"
                    :key="item.id"
                    :source="item"
                ></dialog-item>
            </div>
        </div>

        <div class="footer">
            <content-input
                v-model="currentValue.content"
                @confirm="onConfirm"
            ></content-input>
            <role-list @changeRole="onChangeRole"></role-list>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { More as MoreIcon, CloseSmall } from '@icon-park/vue-next';
import DialogItem from './components/DialogItem.vue';
import ContentInput from './components/ContentInput.vue';
import RoleList from './components/RoleList.vue';
import { IDialog } from '@/types/Dialog';
import { IRole } from '@/types/Role';

const dataList = ref<IDialog[]>([]);

const currentValue = reactive<IDialog>({
    content: '',
    roleId: 0,
    id: 0,
    type: 'voiceover',
    roleName: '',
    roleAvatar: '',
});

const onChangeRole = (role: IRole) => {
    if (role.id === 0) {
        currentValue.roleId = 0;
        currentValue.roleName = '';
        currentValue.roleAvatar = '';
        currentValue.type = 'voiceover';
    } else {
        currentValue.roleId = role.id;
        currentValue.roleName = role.name;
        currentValue.roleAvatar = role.avatar;
        currentValue.type = 'text';
        currentValue.side = role.side;
    }
};

const onConfirm = () => {
    dataList.value.push({
        ...currentValue,
    });
    currentValue.content = ''
};
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
</style>
