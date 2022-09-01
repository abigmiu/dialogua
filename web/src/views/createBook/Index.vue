<template>
    <div>
        <van-nav-bar
            title="创建书本"
            left-text="返回"
            left-arrow
            class="mb-5"
        />

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="bookData.name"
                    name="name"
                    label="书名"
                    placeholder="此处输入书名"
                    required
                    autocomplete="off"
                    :rules="nameRule"
                ></van-field>
                <van-field name="cover" label="上传封面">
                    <template #input>
                        <van-uploader
                            v-model="coverFile"
                            :max-count="1"
                            accept=".jpeg,.jpg,.png"
                            :max-size="2000 * 1024"
                            @oversize="onOversize"
                            :after-read="onAfterRead"
                            @delete="onDelete"
                        />
                    </template>
                </van-field>
            </van-cell-group>

            <div style="margin: 16px">
                <van-button
                    round
                    block
                    type="primary"
                    native-type="submit"
                    :loading="loading"
                >
                    创建
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import type { UploaderFileListItem } from 'vant';
const loading = ref(false);

const bookData = reactive({
    name: '',
    cover: '',
});

const coverFile = ref([]);
const onOversize = () => {
    Toast('文件大小不能超过 2mb');
};
const onAfterRead = async (file: UploaderFileListItem) => {
    file.status = 'uploading';
    const res = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('1');
        }, 2000);
    });
    file.status = 'done';
    bookData.cover = res as string;
};
const onDelete = () => {
    bookData.cover = '';
};

const nameRule = [
    {
        validator: (value: string) => {
            console.log(value);
            return !!value.trim();
        },
        message: '未填写书名',
        trigger: 'onSubmit',
    },
];

const onSubmit = async (values: any) => {
    try {
        loading.value = true;
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('1');
            }, 2000);
        });
    } finally {
        loading.value = false;
    }
};
</script>