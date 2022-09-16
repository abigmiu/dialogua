<template>
    <div class="h-full flex flex-col justify-center items-center p-5">
        <van-field placeholder="邮箱" v-model="formData.email"></van-field>
        <van-field placeholder="密码" v-model="formData.password"></van-field>
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

const router = useRouter();

const submitLoading = ref(false);

const formData = reactive({
    email: '',
    password: '',
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


        await http.post('user', formData)
    } finally {
        submitLoading.value = false;
    }
};

const onCancel = () => {
    router.back();
};
</script>

<style scoped></style>