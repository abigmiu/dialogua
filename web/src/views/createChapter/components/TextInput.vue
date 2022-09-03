<template>
    <div class="text-input">
        <van-field
            class="text-inner"
            :modelValue="modelValue"
            @update:model-value="onInput"
            rows="1"
            :autosize="{
                maxHeight: 64,
            }"
            type="textarea"
            placeholder="请输入"
        />
        <!-- <div class="pic-icon">
            <pic-icon theme="outline" size="16" fill="#333"  />
        </div> -->
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Pic as PicIcon } from '@icon-park/vue-next';
const props = defineProps<{
    modelValue: string;
}>();
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onInput = (value: string) => {
    emits('update:modelValue', value);
};
</script>
<style lang="scss" scoped>
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
</style>
