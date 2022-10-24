<!-- 编辑角色信息 -->
<template>
    <div>
        <van-dialog
            title='编辑角色信息'
            v-model:show='visible'
            :show-cancel-button='true'
            :before-close='onClose'
        >
            <div class='flex flex-col items-center mt-2'>
                <van-uploader
                    v-model='coverFile'
                    :max-count='1'
                    accept='.jpeg,.jpg,.png'
                    :max-size='2000 * 1024'
                    @oversize='onOversize'
                    :after-read='onAfterRead'
                    @delete='onDelete'
                ></van-uploader>
                <input
                    class='name-input'
                    v-model='roleData.name'
                    placeholder='输入角色名'
                    maxlength='20'
                />
                <van-field
                    class='name-input mt-2 mb-2'
                    v-model='roleData.intro'
                    rows='2'
                    autosize
                    type='textarea'
                    maxlength='100'
                    placeholder='请输入介绍'
                    show-word-limit
                />
            </div>
        </van-dialog>
    </div>
</template>
<script lang='ts' setup>
import { reactive, ref, watch } from 'vue';
import { Dialog, Toast } from 'vant';
import type { UploaderFileListItem } from 'vant';
import type { IRole } from '@/types/Role';
import { http } from '@/utils/http';
import { useRouter, useRoute } from 'vue-router';

const VanDialog = Dialog.Component;

const route = useRoute();
const params = route.params;
const id = Number(params.bookId as string);

const props = defineProps<{
    visible: Boolean;
    roleData: IRole;
    activeType: 'add' | 'edit';
}>();
const emits = defineEmits<{
    (e: 'update:visible', data: boolean): void;
    (e: 'confirm', data: any): void;
}>();

const onClose = async (action: string) => {
    if (action === 'confirm') {
        try {
            if (props.activeType === 'add') {
                const res = await http.post(`book-role/${id}`, roleData);
                emits('confirm', res);
            } else {
                const res = await http.put(`book-role/${roleData.id}`, roleData);
                emits('confirm', res);
            }
        } catch {
            return false;
        }
    }

    emits('update:visible', false);
};

const roleData = reactive({
    id: 0,
    avatar: '',
    name: '',
    intro: '',
    side: 'left',
    type: 'text',
});
watch(
    () => props.roleData,
    (value: IRole) => {
        roleData.id = value.id || 0;
        roleData.avatar = value.avatar;
        roleData.name = value.name;
        roleData.intro = value.intro;
        roleData.side = value.side;
    },
);

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
    roleData.avatar = res as string;
};
const onDelete = () => {
    roleData.avatar = '';
};

const validateForm = () => {
    if (!roleData.name) {
        Toast('未填写角色名');
        return false;
    }

    return true;
};
</script>
<style lang='scss' scoped>
.name-input {
    display: block;
    width: 80%;
    background-color: #f6f7f9;
    padding: 5px 10px;
    border-radius: 4px;
}
</style>
