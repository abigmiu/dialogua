<!-- 角色列表子组件 -->
<template>
    <div class="role-item-wrapper">
        <div class="left">
            <van-image
                round
                width="50px"
                height="50px"
                :src="source.avatar"
            />
            <div class="role-side">{{ source.side === 1 ? '左侧角色' : '右侧角色' }}</div>
        </div>
        <div class="right">
            <div class="name">{{ source.name }}</div>
            <div class="introduction">{{ source.intro || '无' }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IRole } from '@/types/Role';

const props = defineProps<{
    source: IRole,
}>();

</script>
<style lang="scss" scoped>
.role-item-wrapper {
    padding: 15px 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .left {
        margin-right: 20px;
        position: relative;
    }
    .role-side {
        position: absolute;
        left: 50%;
        top: -5px;
        padding: 2px 4px;
        border: 0.5px solid rgba(#ccc, .3);
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
        line-height: 1;
        transform: translateX(-50%) scale(.7);
        background-color: rgba(#fff, .3);
    }
    .right {
        flex: 1;
        align-self: start;
    }
    .introduction {
        font-size: 10px;
        color: #dad7d7;
    }
}
</style>
