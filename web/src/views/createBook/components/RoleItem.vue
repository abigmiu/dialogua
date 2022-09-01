<!-- 角色列表子组件 -->
<template>
    <div class="role-item-wrapper">
        <div class="left">
            <van-image
                round
                width="50px"
                height="50px"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <div class="role-side">右侧角色</div>
        </div>
        <div class="right">
            <div class="name">312312</div>
            <div class="introduction">123123123</div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
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
