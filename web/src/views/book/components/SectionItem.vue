<template>
    <div class="bubble-item">
        <voice-bubble :source="source" v-if="(source.side === 0)"></voice-bubble>
        <LeftDialogBubbleVue :source="source" v-if="(source.side === 1)"></LeftDialogBubbleVue>
    </div>

</template>
<script lang="ts" setup>
import { ISectionItemResponseWithRole } from '@/types/Section';
import VoiceBubble from './VoiceBubble.vue';
import LeftDialogBubbleVue from './LeftDialogBubble.vue';

const props = defineProps<{
    source: ISectionItemResponseWithRole
}>()
</script>
<style lang="scss">
@import '@/assets/style/bubble.scss';
</style>