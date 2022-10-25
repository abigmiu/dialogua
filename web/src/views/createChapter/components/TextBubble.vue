<!-- 气泡文字 -->
<template>
    <div class="bubble">
        {{ source.content }}
    </div>
</template>
<script lang="ts" setup>
import type { ISection } from '@/types/Dialog';
import { WavesLeft } from '@icon-park/vue-next';
const props = defineProps<{
    source: ISection;
}>();
</script>
<style lang="scss" scoped>
.bubble {
    background: #fff;
    border-color: #fff;
    padding: 8px 12px;
    border-radius: 12px;
    position: relative;
    font-size: 16px;

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
    .bubble {
        background: #00aff3;
        border-color: #00aff3;
        color: #fff;
        &::before {
            display: none;
        }
        &::after {
            content: '';
            position: absolute;
            border: 8px solid transparent;
            border-bottom-color: inherit;
            top: 4px;
            border-bottom-right-radius: 80%;
            transform: rotate(-25deg) skewX(-10deg);
            right: -8px;
        }
    }
}
</style>
