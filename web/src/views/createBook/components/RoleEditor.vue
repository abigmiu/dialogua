<!-- 编辑角色信息 -->
<template>
    <div>
        <van-dialog
            title="编辑角色信息"
            v-model:show="visible"
            :show-cancel-button="true"
            :before-close="onClose"
        >
            <div class="flex flex-col items-center mt-2">
                <van-uploader
                    v-model="coverFile"
                    :max-count="1"
                    accept=".jpeg,.jpg,.png"
                    :max-size="2000 * 1024"
                    @oversize="onOversize"
                    :after-read="onAfterRead"
                    @delete="onDelete"
                ></van-uploader>
                <input
                    class="name-input"
                    v-model="roleData.name"
                    placeholder="输入角色名"
                    maxlength="20"
                />
                <van-field
                    class="name-input mt-2 mb-2"
                    v-model="roleData.introduction"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="请输入介绍"
                    show-word-limit
                />
            </div>
        </van-dialog>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Dialog, Toast } from 'vant';
import type { UploaderFileListItem } from 'vant';

const VanDialog = Dialog.Component;

const props = defineProps<{
    visible: Boolean;
}>();
const emits = defineEmits<{
    (e: 'update:visible', data: boolean): void;
}>();

const onClose = async (action: string) => {
    if (action === 'confirm') {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve('1');
            }, 2000);
        });
    }

    emits('update:visible', false);
};

const roleData = reactive({
    cover: '',
    name: '',
    introduction: '',
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
    roleData.cover = res as string;
};
const onDelete = () => {
    roleData.cover = '';
};

const validateForm = () => {
    if (!roleData.name) {
        Toast('未填写角色名');
        return false;
    }

    return true;
}
</script>
<style lang="scss" scoped>
.name-input {
    display: block;
    width: 80%;
    background-color: #f6f7f9;
    padding: 5px 10px;
    border-radius: 4px;
}
</style>
