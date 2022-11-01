<!-- 对话框编辑菜单 -->
<template>
    <div class="editor-wrapper" @click="onHandlePosition" ref="iconRef">
        <van-popover
            v-model:show="showPopover"
            theme="dark"
            :placement="placement"
            @close="onClose"
        >
            <div class="actions">
                <div class="action-item" @click="onSelect('edit')">
                    <div>
                        <file-editing-one theme="outline" size="16" fill="#fff" />
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
                    <div>上插</div>
                </div>
                <div class="action-item" @click="onSelect('downInsert')">
                    <div>
                        <double-down theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>下插</div>
                </div>
            </div>
            <template #reference>
                <pencil-icon theme="outline" size="12" :fill="
                    activeSectionId === source.id ? '#00aff3' : '#333'
                " class="pencil" />
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
import { Dialog, Popover, PopoverPlacement } from 'vant';

import type { ISection, IEditAction } from '@/types/Dialog';
import { useDialogStore } from '@/store/chapter';
import { useRoleStore } from '@/store/role';
import { storeToRefs } from 'pinia';
const dialogStore = useDialogStore();
const roleStore = useRoleStore();
const { activeSectionId } = storeToRefs(dialogStore);

const props = defineProps<{
    source: ISection;
}>();
const showPopover = ref(false);
const placement = ref<PopoverPlacement>('bottom');

const iconRef = ref<HTMLElement>();

let closeFlag = false;
const onClose = () => {
    if (!closeFlag) {
        dialogStore.activeSectionId = 0;
    }
}


/** 处理 toolTip 位置 */
/** 不在 mounted 的时候处理是考虑后续可能有图片存在的情况
 * 图片没加载完不知道宽度
 */
const onHandlePosition = () => {
    dialogStore.$state.activeSectionId = props.source.id;
    if (!iconRef.value) return;

    const { top, left, right, bottom } = iconRef.value.getBoundingClientRect();
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

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
    // 这里点击后不自动收回，原因不知， 手动处理下
    showPopover.value = false;
};
const onDelete = async () => {
    await Dialog.confirm({
        message: '确定删除这条内容吗？',
        beforeClose: async (action) => {
            if (action === 'confirm') {
                dialogStore.$state.currentAction = 'delete';
                dialogStore.$state.activeSectionId = props.source.id;
                try {
                    await dialogStore.handleAction();               
                } catch {
                    return false;
                }
            } 
            return true;
        }
    })
    dialogStore.activeSectionId = 0;
};
const onEdit = async () => {
    dialogStore.$state.currentAction = 'edit';
    roleStore.changeActiveRoleId(props.source.roleId);
};
const onUpInsert = () => {
    dialogStore.$state.currentAction = 'upInsert';
};
const onDownInsert = () => {
    dialogStore.$state.currentAction = 'downInsert';
};
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
