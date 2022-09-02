<template>
    <div
        class="flex dialog-wrapper"
        :class="{ 'right-bubble': source.side === 'right' }"
    >
        <div class="avatar">
            <img :src="source.roleAvatar" alt="" />
        </div>
        <div class="content">
            <div class="name">{{ source.roleName }}</div>
            <text-bubble
                :source="source"
                v-if="source.type === 'text'"
            ></text-bubble>
            <voice-bubble
                :source="source"
                v-if="source.type === 'voice'"
            ></voice-bubble>
            <edit-tooltip :source="source"></edit-tooltip>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TextBubble from './TextBubble.vue';
import VoiceBubble from './VoiceBubble.vue';
import EditTooltip from './EditTooltip.vue';
import type { IDialog } from '@/types/Dialog';

const props = defineProps<{
    source: IDialog;
}>();
</script>
<style lang="scss" scoped>
.dialog-wrapper {
    margin-inline-end: 44px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-inline-end: 12px;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
.content {
    position: relative;
}
.right-bubble {
}
</style>
