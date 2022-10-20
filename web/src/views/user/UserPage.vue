<template>
    <div class="user-page">
        <user-card></user-card>
        <user-book></user-book>
    </div>

</template>
<script lang="ts" setup>
import UserCard from './components/UserCard.vue'
import UserBook from './components/UserBook.vue'
</script>
<style lang="scss" scoped>
.user-page {
    min-height: 100vh;
    padding: 80px 20px 0;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 150px;
        background: url('https://cdn.pixabay.com/photo/2021/12/02/19/14/elephant-6841179_960_720.jpg');
        background-size: cover;
        background-color: red;
        z-index: -1;
    }
}
</style>
