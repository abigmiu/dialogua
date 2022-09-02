<template>
    <div class="img-wrapper" @click="onPreview">
        <img
            class="img"
            :src="source.content"
            :class="{ long: isLongPic }"
            @load="onImgLoad"
        />
    </div>
</template>
<script lang="ts" setup>
import { IDialog } from '@/types/Dialog';
import { ref } from 'vue';
import { ImagePreview } from 'vant';

const props = defineProps<{
    source: IDialog;
}>();

const isLongPic = ref(false);

const onImgLoad = (e: Event) => {
    const el = e.target as HTMLImageElement;
    const ratio = el.width / el.height;

    if (ratio < 0.8) {
        isLongPic.value = true;
    }
};

const onPreview = () => {
    ImagePreview({
        images: [props.source.content],
        closeable: true,
        showIndex: false,
    });
};
</script>
<style lang="scss" scoped>
.img-wrapper {
    .img {
        border-radius: 12px;
        overflow: hidden;
    }
    .long {
        width: 150px;
    }
}
</style>
