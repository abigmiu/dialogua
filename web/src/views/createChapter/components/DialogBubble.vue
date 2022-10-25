<template>
    <div
        class="flex dialog-wrapper"
        :class="{ 'right-bubble': source.side === 2 }"
    >
        <div class="avatar">
            <img :src="source.roleAvatar" alt="" />
        </div>
        <div class="content">
            <div class="name">{{ source.roleName }}</div>
            <text-bubble
                :source="source"
            ></text-bubble>
            <edit-tooltip :source="source"></edit-tooltip>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TextBubble from './TextBubble.vue';
import EditTooltip from './EditTooltip.vue';
import type { ISection } from '@/types/Dialog';

const props = defineProps<{
    source: ISection;
}>();
</script>
<style lang="scss" scoped>
.dialog-wrapper {
    padding-right: 80px;
}
.avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
.content {
    position: relative;
    // flex: 1;
}
.right-bubble {
    flex-direction: row-reverse;
    padding-right: 0;
    padding-left: 80px;
    .name {
        text-align: right;
    }
    .avatar {
        margin-right: 0;
        margin-left: 12px;
    }
}
</style>
