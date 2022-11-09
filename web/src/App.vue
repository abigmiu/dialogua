<script setup lang="ts">
import { keepAliveRoutesName } from '@/constant/index' 
</script>

<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveRoutesName">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<style scoped>

</style>
