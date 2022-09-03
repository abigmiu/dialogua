<template>
    <div class="role-item" @click="onChangeRole">
        <img :src="source.avatar" alt="" class="avatar" />
        <div class="name">{{ source.name }}</div>
    </div>
</template>
<script lang="ts" setup>
import { IRole } from '@/types/Role';

const props = defineProps<{
    source: IRole;
    index: number;
}>();
const emits = defineEmits<{
    (e: 'changeRole', index: number): void;
}>();

const onChangeRole = () => {
    emits('changeRole', props.index);
};
</script>
<style lang="scss" scoped>
.role-item {
    padding: 5px;
    text-align: center;
    font-size: 8px;
    color: #cccccc;
    width: 50px;
    flex-shrink: 0;
    border-radius: 4px;

    &.active {
        background-color: #f0f0f0;
    }

    .avatar {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
    }

    .name {
        margin-top: 4px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢
    }
}
</style>
