<!-- 创建章节 -->
<template>
    <div>
        <van-nav-bar>
            <template #left>
                <close-small theme="outline" size="24" fill="#333"/>
                <div class="info">
                    <div class="title">第一话</div>
                    <div class="status">未发布 0字</div>
                </div>
            </template>
            <template #right>
                <more-icon theme="outline" size="24" fill="#333"/>
            </template>
        </van-nav-bar>

        <div class="list">
            <dialog-user></dialog-user>
            <dialog-user></dialog-user>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { More as MoreIcon, CloseSmall } from '@icon-park/vue-next'
import DialogUser from './components/DialogUser.vue';

</script>
<style lang="scss" scoped>
.info {
    padding: 5px 0;
    line-height: 1.2;
    text-align: left;

    .title {
        font-size: 12px;
    }
    .status {
        font-size: 10px;
    }
}
</style>
