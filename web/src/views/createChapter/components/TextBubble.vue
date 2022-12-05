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
