<template>
    <div>
        <VanPullRefresh v-model="loading" @refresh="onRefresh">
            <HomeDownList></HomeDownList>
        </VanPullRefresh>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import HomeDownList from './components/HomeDownList.vue';

const loading = ref(false)
const onRefresh = () => {
    setTimeout(() => {
        loading.value = false
    },2000)
    console.log('onRefesh');
}
</script>