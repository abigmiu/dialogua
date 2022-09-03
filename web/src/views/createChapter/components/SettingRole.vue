<template>
    <div class="role-item">
        <div class="avatar">
            <edit-name theme="outline" size="20" fill="#333" />
        </div>
        <div class="name">设置角色</div>
    </div>
</template>
<script lang="ts" setup>
import { EditName } from '@icon-park/vue-next';
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
        background-color: #f0f0f0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        line-height: 30px;
        padding-top: 5px;
    }

    .name {
        margin-top: 4px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢
    }
}
</style>
