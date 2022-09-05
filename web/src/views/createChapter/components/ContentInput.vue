<template>
    <div class="content-input-wrapper">
        <div class="input-box">
            <div class="text-input">
                <van-field
                    class="text-inner"
                    v-model="currentContent"
                    rows="1"
                    :autosize="{
                        maxHeight: 64,
                    }"
                    type="textarea"
                    placeholder="请输入"
                />
            </div>
        </div>
        <div class="send icon" @click="onConfirm">
            <send-icon theme="outline" size="16" fill="#333" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Send as SendIcon } from '@icon-park/vue-next';
import { Toast } from 'vant';
import { ref } from 'vue';

import { useDialogStore } from '@/store/dialog';
import { storeToRefs } from 'pinia';
const dialogStore = useDialogStore();
const { currentAction, currentContent } = storeToRefs(dialogStore)

const content = ref('');
const onConfirm = () => {
    if (!currentContent.value.trimStart().length) {
        return Toast('未输入内容');
    }

    dialogStore.handleAction();
};
</script>
<style lang="scss" scoped>
.content-input-wrapper {
    display: flex;
    align-items: flex-end;

    .icon {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 15px;
        font-size: 16px;
        line-height: 1;
    }
    .input-box {
        flex: 1;
        margin-right: 10px;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 15px;
        overflow: hidden;
    }
    .text-input {
        display: flex;
        line-height: 16px;
        align-items: flex-end;
        .text-inner {
            flex: 1;
            padding: 0;
            background-color: inherit;
            font-size: 14px;
            line-height: inherit;
        }
        .pic-icon {
            margin-left: 10px;
            line-height: inherit;
        }
    }
}
</style>
