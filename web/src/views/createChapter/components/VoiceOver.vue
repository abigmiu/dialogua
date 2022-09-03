<!-- 旁白 -->
<template>
    <div class="voice-over">
        <div class="content">
            {{ source.content }}
            <edit-tooltip :source="source"></edit-tooltip>
        </div>
    </div>
</template>
<script lang="ts" setup>
import EditTooltip from './EditTooltip.vue';
import type { IDialog } from '@/types/Dialog';

const props = defineProps<{
    source: IDialog;
}>();
</script>
<style lang="scss" scoped>
.voice-over {
    display: flex;
    justify-content: center;
    .content {
        max-width: 70%;
        margin: 0 auto;
        position: relative;
        padding: 4px 10px;
        background-color: #f0f0f0;
        border-radius: 8px;
    }
}
</style>
