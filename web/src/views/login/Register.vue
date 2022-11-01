<template>
    <div class="h-full flex flex-col justify-center items-center p-5">
        <h1 class="mb-2 text-lg">注册</h1>
        <van-field placeholder="昵称" v-model.trim="formData.nickname"></van-field>
        <van-field placeholder="邮箱" v-model.trim="formData.email"></van-field>
        <van-field placeholder="密码" v-model.trim="formData.password" type="password"></van-field>
        <van-button style="margin-top: 20px" type="primary" block :loading="submitLoading" @click="onSubmit">
            注册
        </van-button>
        <van-button style="margin-top: 20px" block @click="onCancel">
            取消
        </van-button>
    </div>
</template>

<script setup lang="ts">
import type { IUserInfo } from '@/types/User';

import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store/user';

import { http } from '@/utils/http';


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
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(formData.email)) {
            return Toast('邮箱格式不正确');
        }
        if (formData.password.length < 6) {
            return Toast('密码不能小于6位');
        }
        if (!/^[\u4e00-\u9fa50-9A-Za-z0-9]{2,10}$/.test(formData.nickname)) {
            return Toast('昵称格式为2-10位中英文数字组合');
        }

        submitLoading.value = true;
        const res = await http.post<IUserInfo>('user', formData);
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