<template>
    <div class="flex dialog-wrapper">
        <div class="avatar">
            <img
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                alt=""
            />
        </div>
        <div class="right">
            <div class="name">123123</div>
            <text-bubble></text-bubble>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TextBubble from './TextBubble.vue';
</script>
<style lang="scss" scoped>
.dialog-wrapper {
    margin-inline-end: 44px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-inline-end: 12px;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
</style>
