<template>
    <div class="home">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
        <layout-footer></layout-footer>
    </div>
</template>
<script lang="ts" setup>
import LayoutFooter from '@/components/layout/LayoutFooter.vue'
</script>
<style lang="scss">
.home {
    padding-bottom: 75px;
}
</style>
