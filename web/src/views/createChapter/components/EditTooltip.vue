<!-- 对话框编辑菜单 -->
<template>
    <div class="editor-wrapper" @click="onHandlePosition" ref="iconRef">
        <van-popover v-model:show="showPopover" theme="dark" :placement="placement">
            <div class="actions">
                <div class="action-item" @click="onSelect(sectionActionType.edit)">
                    <div>
                        <file-editing-one theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>编辑</div>
                </div>
                <div class="action-item" @click="onSelect(sectionActionType.delete)">
                    <div>
                        <delete-one theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>删除</div>
                </div>
                <div class="action-item" @click="onSelect(sectionActionType.upInsert)">
                    <div>
                        <double-up theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>上插</div>
                </div>
                <div class="action-item" @click="onSelect(sectionActionType.downInsert)">
                    <div>
                        <double-down theme="outline" size="16" fill="#fff" />
                    </div>
                    <div>下插</div>
                </div>
            </div>
            <template #reference>
                <pencil-icon theme="outline" size="12" :fill="activeSectionId === source.id ? '#00aff3' : '#333'
                " class="pencil" />
            </template>
        </van-popover>
    </div>
</template>
<script lang="ts" setup>
import type { ISection, ISectionAction } from '@/types/Dialog';

import { ref } from 'vue';
import {
    Pencil as PencilIcon,
    DoubleDown,
    DoubleUp,
    FileEditingOne,
    DeleteOne,
} from '@icon-park/vue-next';
import { Dialog, Popover, PopoverPlacement } from 'vant';

import { sectionActionType } from '@/constant';

import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/store/chapter';
import { useRoleStore } from '@/store/role';

const dialogStore = useDialogStore();
const roleStore = useRoleStore();
const { activeSectionId } = storeToRefs(dialogStore);

const props = defineProps<{
    source: ISection;
}>();
const showPopover = ref(false);
const placement = ref<PopoverPlacement>('bottom');

const iconRef = ref<HTMLElement>();

/** 处理 toolTip 位置 */
/** 不在 mounted 的时候处理是考虑后续可能有图片存在的情况
 * 图片没加载完不知道宽度
 */
const onHandlePosition = () => {
    dialogStore.activeSectionId = props.source.id;
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

const onSelect = (action: ISectionAction) => {
    if (action === sectionActionType.delete) {
        onDelete();
    }

    if (action === sectionActionType.edit) {
        onEdit();
    }

    if (action === sectionActionType.upInsert) {
        onUpInsert();
    }

    if (action === sectionActionType.downInsert) {
        onDownInsert();
    }
    // 这里点击后不自动收回，原因不知， 手动处理下
    showPopover.value = false;
};
const onDelete = async () => {
    await Dialog.confirm({
        message: '确定删除这条内容吗？',
        beforeClose: async (action) => {
            if (action === 'confirm') {
                dialogStore.currentAction = sectionActionType.delete;
                dialogStore.activeSectionId = props.source.id;
                try {
                    await dialogStore.deleteDialog();
                } catch {
                    return false;
                }
            }
            return true;
        }
    })
};
const onEdit = async () => {
    dialogStore.currentAction = sectionActionType.edit;
    roleStore.changeActiveRoleId(props.source.roleId);
    dialogStore.changeactiveSectionId(props.source.id);
};
const onUpInsert = () => {
    dialogStore.currentAction = sectionActionType.upInsert;
};
const onDownInsert = () => {
    dialogStore.currentAction = sectionActionType.downInsert;
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
