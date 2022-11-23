<template>
    <div class="bubble-voice-over">{{ source.content }}</div>
</template>
<script lang="ts" setup>
import { ISectionItemResponseWithRole } from '@/types/Section';

const props = defineProps<{
    source: ISectionItemResponseWithRole
}>()
</script>
