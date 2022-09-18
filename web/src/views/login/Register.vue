<template>
    <div class="h-full flex flex-col justify-center items-center p-5">
        <van-field
            placeholder="昵称"
            v-model.trim="formData.nickname"
        ></van-field>
        <van-field placeholder="邮箱" v-model.trim="formData.email"></van-field>
        <van-field
            placeholder="密码"
            v-model.trim="formData.password"
        ></van-field>
        <van-button
            style="margin-top: 20px"
            type="primary"
            block
            :loading="submitLoading"
            @click="onSubmit"
        >
            注册
        </van-button>
        <van-button style="margin-top: 20px" block @click="onCancel">
            取消
        </van-button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { http } from '@/utils/http';
import { useUserStore } from '@/store/user';
import { IUserInfo } from '@/types/User';

const router = useRouter();
const userStore = useUserStore();

const submitLoading = ref(false);

const formData = reactive({
    email: '',
    password: '',
    nickname: '',
});

const onSubmit = async () => {
    try {
        if (
            !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(formData.email)
        ) {
            return Toast({
                message: '邮箱格式不正确',
            });
        }

        if (formData.password.length < 6) {
            return Toast({
                message: '密码不能小于6位',
            });
        }
        submitLoading.value = true;

        if (formData.nickname.length < 2 || formData.nickname.length > 10) {
            return Toast({
                message: '昵称2-10个字',
            });
        }

        const res: IUserInfo = await http.post('user', formData);
        userStore.setUser(res);
        Toast('注册成功');
        router.replace('/');
    } finally {
        submitLoading.value = false;
    }
};

const onCancel = () => {
    router.back();
};
</script>

<style scoped></style>
