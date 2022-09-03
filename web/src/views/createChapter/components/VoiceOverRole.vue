<template>
    <div class="role-item">
        <div class="avatar">旁白</div>
        <div class="name">旁白</div>
    </div>
</template>
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
        color: rgb(141, 183, 169);
        background-color: rgba(aquamarine, .5);
        font-size: 10px;
        text-align: center;
        line-height: 30px;
    }

    .name {
        margin-top: 4px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢
    }
}
</style>
