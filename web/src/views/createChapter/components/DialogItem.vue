<template>
    <voice-over v-if="source.type === 'voiceover'" :source="source"></voice-over>
    <dialog-bubble v-else :source="source"></dialog-bubble>
</template>
<script lang="ts" setup>
import type { IDialog } from '@/types/Dialog';
import VoiceOver from './VoiceOver.vue';
import DialogBubble from './DialogBubble.vue';

const props = defineProps<{
    source: IDialog
}>()
</script>
