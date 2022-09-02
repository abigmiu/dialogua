<!-- 对话框编辑菜单 -->
<template>
    <div class="editor-wrapper">
        <van-popover v-model:show="showPopover" theme="dark">
            <div class="actions">
                <div class="action-item" @click="onSelect('edit')">
                    <div>
                        <file-editing-one
                            theme="outline"
                            size="16"
                            fill="#fff"
                        />
                    </div>
                    <div>编辑</div>
                </div>
                <div class="action-item" @click="onSelect('delete')">
                    <div>
                        <delete-one theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>删除</div>
                </div>
                <div class="action-item" @click="onSelect('upInsert')">
                    <div>
                        <double-up theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>双上</div>
                </div>
                <div class="action-item" @click="onSelect('downInsert')">
                    <div>
                        <double-down theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>双下</div>
                </div>
            </div>
            <template #reference>
                <pencil-icon theme="outline" size="12" fill="#333" />
            </template>
        </van-popover>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
    Pencil as PencilIcon,
    DoubleDown,
    DoubleUp,
    FileEditingOne,
    DeleteOne,
} from '@icon-park/vue-next';
import { Dialog } from 'vant';

import type { IDialog, IEditAction } from '@/types/Dialog';

const props = defineProps<{
    source: IDialog;
}>();
const showPopover = ref(false);

const onSelect = (actions: IEditAction) => {
    switch (actions) {
        case 'delete':
            onDelete();
            break;
        case 'edit':
            onEdit();
            break;
        case 'upInsert':
            onUpInsert();
            break;
        case 'downInsert':
            onDownInsert();
            break;
        default:
            break;
    }
};
const onDelete = () => {
    Dialog.confirm({
        message: '确定删除这条内容吗？',
    })
        .then(() => {})
};
const onEdit = () => {};
const onUpInsert = () => {};
const onDownInsert = () => {};
</script>
<style lang="scss" scoped>
.editor-wrapper {
    position: absolute;
    left: 100%;
    bottom: 0;
    padding: 2px 8px;
    background-color: rgba(#ccc, 0.3);
    border-radius: 12px;
    margin-left: 12px;
    // display: flex;
    // align-items: center;
}

.actions {
    padding: 8px 10px;
    display: flex;
    .action-item {
        width: 40px;
        font-size: 10px;
        text-align: center;
    }
}
</style>
