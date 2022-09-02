<!-- 对话框编辑菜单 -->
<template>
    <div class="editor-wrapper" @click="onOpened" ref="iconRef">
        <van-popover
            v-model:show="showPopover"
            theme="dark"
            :placement="placement"
        >
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
                <pencil-icon
                    theme="outline"
                    size="12"
                    fill="#333"
                    class="pencil"
                />
            </template>
        </van-popover>
    </div>
</template>
<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue';
import {
    Pencil as PencilIcon,
    DoubleDown,
    DoubleUp,
    FileEditingOne,
    DeleteOne,
} from '@icon-park/vue-next';
import { Dialog, Popover } from 'vant';

import type { IDialog, IEditAction } from '@/types/Dialog';

const props = defineProps<{
    source: IDialog;
}>();
const showPopover = ref(false);
const placement = ref('bottom');

const iconRef = ref<HTMLElement>();
const onOpened = () => {
    if (!iconRef.value) return;

    const { top, left, right, bottom } = iconRef.value.getBoundingClientRect();
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    console.log(clientWidth, clientHeight);

    const isOverRight = clientWidth - right < 90;
    const isOverBottom = clientHeight - bottom < 30;
    const isOverLeft = left < 120;

    if (isOverLeft) {
        placement.value = 'bottom-start';
    }
    if (isOverRight) {
        placement.value = 'bottom-end';
    }
    if (isOverBottom) {
        placement.value = 'top';
        if (isOverRight) {
            placement.value = 'top-end';
        }
        if (isOverLeft) {
            placement.value = 'top-start';
        }
    }
    console.log(top, left, right, bottom);
    if (right <= 10) {
        placement.value = 'bottom-start';
    }
};

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
    }).then(() => {});
};
const onEdit = () => {};
const onUpInsert = () => {};
const onDownInsert = () => {};
</script>
<style lang="scss" scoped>
.editor-wrapper {
    position: absolute;
    left: calc(100% + 12px);
    bottom: 0;
    background-color: rgba(#ccc, 0.3);
    border-radius: 12px;
    font-size: 12px;

    .pencil {
        padding: 3px 10px;
    }
}
.right-bubble .editor-wrapper {
    left: -44px;
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
