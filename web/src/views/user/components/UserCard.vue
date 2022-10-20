<template>
    <div class="user-card" v-if="userInfo">
        <div class="avatar">
            <img :src="userInfo.avatar" alt="">
        </div>

        <div class="nickname">{{ userInfo.nickname }}</div>
        <div class="signature">个性签名</div>
    </div>
    <div v-else class="login-btn">
        <van-button
            type="primary"
            round
            block
            @click="onLogin"
        >立即登录</van-button>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore)

const router = useRouter()

const onLogin = () => {
    router.push({
        name: 'Login'
    })
}

</script>
<style lang="scss" scoped>
.user-card {
    background: rgba(#fff, .97);
    border-radius: 20px;
    padding: 20px;
    position: relative;
    padding-top: 60px;

    .avatar {
        border-radius: 9999px;
        position: absolute;
        top: -20px;
        width: 60px;
        height: 60px;
        background-color: #ccc;

        &-img {
            width: 100%;
            height: 100%;
        }
    }

    .nickname {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .signature {
        font-size: 12px;
        color: #aaa;
        margin-bottom: 5px;
    }
}
.login-btn {
    margin: 0 80px;
}
</style>
