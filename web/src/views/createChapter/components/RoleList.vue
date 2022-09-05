<template>
    <div class="relative role-list-wrapper">
        <div class="role-list">
            <setting-role></setting-role>
            <voice-over
                @click="onChangeRole(0)"
                :class="{ active: activeRoleId === 0 }"
            ></voice-over>
            <role-item
                v-for="item in roleList"
                :key="item.id"
                :source="item"
                :class="{ active: activeRoleId === item.id }"
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
import { storeToRefs } from 'pinia';
import VoiceOver from './VoiceOverRole.vue';
import SettingRole from './SettingRole.vue';
import RoleItem from './RoleItem.vue';
import { Down as DownIcon } from '@icon-park/vue-next';

import { useRoleStore } from '@/store/role'
import { roles } from '@/constant/index'

const roleStore = useRoleStore()
const { activeRoleId, roleList }  = storeToRefs(roleStore)
const onChangeRole = (id: number) => {
    roleStore.changeActiveRoleId(id);
}
const initRoles = () => {
    roleStore.changeRoleList(roles);
}

initRoles()
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
