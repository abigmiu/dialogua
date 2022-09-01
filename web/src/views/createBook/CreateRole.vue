<!-- 新建角色 -->
<template>
    <div>
        <van-nav-bar
            title="新建角色"
            right-text="保存"
            left-arrow
            class="mb-5"
        ></van-nav-bar>
        <div class="role-btns">
            <div class="role-btn">
                <div class="title">左侧角色</div>
                <div class="tip">可以随意添加多个角色</div>
                <div class="add-icon left" @click="createRole('left')">
                    <plus-icon fill="#ffffff" size="32" />
                </div>
            </div>
            <div class="role-btn">
                <div class="title">右侧角色</div>
                <div class="tip">可以随意添加多个角色，通常主角在右边</div>
                <div class="add-icon right" @click="createRole('right')">
                    <plus-icon fill="#ffffff" size="32" />
                </div>
            </div>
        </div>

        <div class="role-list">
            <role-item @click="editRole"></role-item>
        </div>
        <role-editor v-model:visible="editorVisible" :roleData="roleData"></role-editor>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Plus as PlusIcon } from '@icon-park/vue-next';
import RoleEditor from './components/RoleEditor.vue';
import RoleItem from './components/RoleItem.vue';
import type { IRole } from '@/types/Role';

const editorVisible = ref(false);

const roleData = ref<IRole>({
    name: '',
    avatar: '',
    cover: '',
    side: 'left',
    introduction: '',
})
const createRole = (side: 'left' | 'right') => {
    if (!(side === 'left' || side === 'right')) return;
    roleData.value = {
        name: '',
        avatar: '',
        cover: '',
        side,
        introduction: '',
    }
    editorVisible.value = true;
}

const editRole = (data: IRole) => {
    roleData.value = data;
    editorVisible.value = true;
}

</script>
<style lang="scss" scoped>
.role-btns {
    display: flex;
    .role-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tip {
        margin-top: 10px;
        font-size: 10px;
        color: #dad7d7;
        max-width: 100px;
        line-height: 16px;
        height: 48px;
        text-align: center;
    }

    .add-icon {
        margin-top: 15px;
        width: 80px;
        height: 80px;
        background-color: #000;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &.left {
            background-color: #5b8266;
        }
        &.right {
            background-color: #477998;
        }
    }
}
</style>
