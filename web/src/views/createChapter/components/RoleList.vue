<template>
    <div class="relative role-list-wrapper">
        <div class="role-list">
            <setting-role></setting-role>
            <voice-over
                @click="onChangeRole(-1)"
                :class="{ active: activeIndex === -1 }"
            ></voice-over>
            <role-item
                v-for="(item, index) in roles"
                :key="item.id"
                :source="item"
                :index="index"
                :class="{ active: activeIndex === index }"
                @changeRole="onChangeRole"
            ></role-item>
        </div>
        <div class="spread">
            <down-icon theme="outline" size="16" fill="#333" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import VoiceOver from './VoiceOverRole.vue';
import SettingRole from './SettingRole.vue';
import RoleItem from './RoleItem.vue';
import { Down as DownIcon } from '@icon-park/vue-next';

import { roles } from '@/constant/index';
import { IRole } from '@/types/Role';

const emits = defineEmits<{
    (e: 'changeRole', role: IRole): void;
}>();

let activeIndex = ref(-1);

const onChangeRole = (index: number) => {
    activeIndex.value = index;
    if (index === -1) {
        return emits('changeRole', {
            id: 0,
            name: '旁白',
            avatar: '',
            side: 'voiceover',
        });
    }
    emits('changeRole', roles[index]);
};
</script>
<style lang="scss" scoped>
.role-list {
    &-wrapper {
        padding-right: 25px;
    }
    display: flex;
    margin-top: 10px;
    flex-wrap: nowrap;
    overflow-y: scroll;
    position: relative;
}
.spread {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 25px;
    box-shadow: -2px 0 18px #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
