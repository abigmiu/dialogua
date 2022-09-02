<!-- 气泡语音 -->
<template>
    <div class="bubble">
        <waves-left
            theme="outline"
            size="14"
            fill="#333"
            v-if="source.side === 'left'"
        />
        {{ transformDuration(source.duration) }}
        <waves-right
            theme="outline"
            size="14"
            fill="#fff"
            v-if="source.side === 'right'"
        />
    </div>
</template>
<script lang="ts" setup>
import type { IDialog } from '@/types/Dialog';
import { WavesLeft, WavesRight } from '@icon-park/vue-next';
const props = defineProps<{
    source: IDialog;
}>();

const transformDuration = (second: number) => {
    if (second <= 60) {
        return `${second} ″`;
    } else {
        return `${Math.floor(second / 60)} ′ ${second % 60} ″`;
    }
};
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
        margin-left: -20px;
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
