<!-- 气泡语音 -->
<template>
    <div class="bubble">
        <waves-left theme="outline" size="14" fill="#333" v-if="source.side === 'left'"/>
        {{ source.duration }}
        <waves-right theme="outline" size="14" fill="#333" v-if="source.side === 'right'"/>
    </div>
</template>
<script lang="ts" setup>
import type { IDialog } from '@/types/Dialog';
import { WavesLeft, WavesRight } from '@icon-park/vue-next'
const props = defineProps<{
    source: IDialog;
}>();
</script>
<style lang="scss" scoped>
.bubble {
    background: #fff;
    border-color: #fff;
    padding: 8px 12px;
    border-radius: 12px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        border: 8px solid transparent;
        border-bottom-color: inherit;
        border-inline-end-color: inherit;
        margin-inline-start: -20px;
        top: 4px;
        border-bottom-left-radius: 80%;
        transform: rotate(25deg) skewX(10deg);
    }
}
.right-bubble {
    .text-bubble {
        background: #00aff3;
        border-color: #00aff3;
        color: #fff;

        &::before {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 80%;
            transform: rotate(-25deg) skewX(-10deg);
        }
    }
}
</style>
