<template>
    <div class="bubble-item">
        <voice-bubble :source="source"></voice-bubble>
    </div>

</template>
<script lang="ts" setup>
import { ISectionItemResponseWithRole } from '@/types/Section';
import VoiceBubble from './VoiceBubble.vue';

const props = defineProps<{
    source: ISectionItemResponseWithRole
}>()
</script>
<style lang="scss">
@import '@/assets/style/bubble.scss';
</style>