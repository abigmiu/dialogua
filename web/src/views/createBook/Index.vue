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
import type { ICreateBookResponse } from '@/types/Book';

import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

import { http } from '@/utils/http';
import { uploadFile } from '@/utils/fileUpload'
import { cropperBookCover, generateBookWordCover } from '@/utils/cropperImage'

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
            if (!/^[\u4e00-\u9fa50-9A-Za-z0-9]{2,10}$/.test(value)) {
                return '书本名称为2-10位中英文数字组合'
            }
            return true;
        },
        trigger: 'onBlur',
    },
];
const onSubmit = async () => {
    try {
        if (!bookData.cover) {
            const file = await generateBookWordCover(bookData.title)
            if (file) {
                bookData.cover = await uploadFile(file);
            }
        }
        loading.value = true;

        const res = await http.post<ICreateBookResponse>('book', bookData);
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
