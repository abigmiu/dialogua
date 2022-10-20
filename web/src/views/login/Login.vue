<template>
    <div class="h-full flex flex-col justify-center items-center p-5">
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
            登录
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
});

const onSubmit = async () => {
    try {
        const res: IUserInfo = await http.post('user/login', formData);
        userStore.setUser(res);
        Toast('登录成功');
        router.replace('/');
    } finally {
        submitLoading.value = false;
    }
};

const onCancel = () => {
    router.back();
};
</script>
