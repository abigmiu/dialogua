<!-- 左气泡 -->
<template>
    <div
        class="flex dialog-wrapper"
    >
        <div class="avatar">
            <img :src="source.roleAvatar" alt="" />
        </div>
        <div class="content">
            <div class="name">{{ source.roleName }}</div>
            <div class="bubble-content">
                {{ source.content }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { ISection } from '@/types/Dialog';

const props = defineProps<{
    source: ISection;
}>();
</script>
<style lang="scss">
@import 'assets/style/bubble.scss'
</style>
