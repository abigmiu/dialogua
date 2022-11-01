<template>
    <div>
        <van-nav-bar title="创建书本" left-text="返回" left-arrow class="mb-5" @click-left="onClickLeft" />

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="bookData.title" name="title" label="书名" placeholder="此处输入书名" required
                    autocomplete="off" :rules="nameRule"></van-field>
                <van-field name="cover" label="上传封面">
                    <template #input>
                        <van-uploader v-model="coverFile" :max-count="1" accept=".jpeg,.jpg,.png"
                            :max-size="2000 * 1024" @oversize="onOversize" :after-read="onAfterRead"
                            @delete="onDelete" />
                    </template>
                </van-field>
            </van-cell-group>

            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit" :loading="loading">
                    创建
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script lang="ts" setup>
import type { FieldRule } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types';

import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

import { http } from '@/utils/http';
import { uploadFile } from '@/utils/fileUpload'
import { cropperBookCover } from '@/utils/cropperImage'


const router = useRouter();

const loading = ref(false);
const bookData = reactive({
    title: '',
    cover: '',
});

const coverFile = ref([]);
const onOversize = () => {
    Toast('文件大小不能超过 2mb');
};
const onAfterRead: UploaderAfterRead = async (file, detail) => {
    if (Array.isArray(file) || !file.file) return;

    file.status = 'uploading';

    const cropperFile = await cropperBookCover(file.file);
    const res = await uploadFile(cropperFile);

    file.file = cropperFile;
    file.status = 'done';
    bookData.cover = res;
};
const onDelete = () => {
    bookData.cover = '';
};

const nameRule: FieldRule[] = [
    {
        validator: (value: string) => {
            console.log(value);
            return !!value.trim();
        },
        message: '未填写书名',
        trigger: 'onSubmit',
    },
];
const onSubmit = async () => {
    try {
        loading.value = true;
        const res: any = await http.post('book', bookData);
        Toast('创建成功');
        await router.replace({
            name: 'CreateRole',
            params: {
                bookId: res.id,
            },
            query: {
                createChapter: 'true',
            }
        });
    } finally {
        loading.value = false;
    }
};

const onClickLeft = () => {
    router.back();
};
</script>
