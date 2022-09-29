<template>
    <div class="footer-wrapper">
        <div class="action-item">
            <home-icon size="24"></home-icon>
        </div>
        <div class="action-item">
            <add-one size="24"></add-one>
        </div>
        <div class="action-item">
            <me-icon size="24"></me-icon>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Home as HomeIcon, AddOne, Me as MeIcon } from '@icon-park/vue-next'
</script>
<style lang="scss" scoped>
.footer-wrapper {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    padding: 10px 20px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
