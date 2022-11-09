<template>
    <div class="footer-wrapper">
        <div class="action-item">
            <home-icon size="24" @click="onJumpByName('Home.List')"></home-icon>
        </div>
        <div class="action-item" @click="onJumpByName('CreateBook', true)">
            <add-one size="24"></add-one>
        </div>
        <div class="action-item" @click="onJumpByName('User')">
            <me-icon size="24"></me-icon>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { Home as HomeIcon, AddOne, Me as MeIcon } from '@icon-park/vue-next'
import { Toast } from 'vant';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const router = useRouter();

const onJumpByName = (name: string, needLogin = false) => {
    // if (needLogin && !userStore.userInfo) {
    //     return Toast({
    //         message: '请先登录'
    //     })
    // }
    router.push({
        name,
    })
}

</script>
<style lang="scss" scoped>
.footer-wrapper {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .action-item {
        padding: 10px 20px;
    }
}
</style>
