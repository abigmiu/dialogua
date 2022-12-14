<template>
    <div class="relative role-list-wrapper">
        <div class="role-list">
            <setting-role @click="onSettingRole"></setting-role>
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
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import VoiceOver from './VoiceOverRole.vue';
import SettingRole from './SettingRole.vue';
import RoleItem from './RoleItem.vue';
import { Down as DownIcon } from '@icon-park/vue-next';

import { useRoleStore } from '@/store/role'
import { useDialogStore } from '@/store/chapter'

const router = useRouter()

const props = defineProps<{
    bookId: string
    chapterId: string
}>()
const emits = defineEmits<{
    (e: 'roles-ready'): void
}>()

const roleStore = useRoleStore()
const dialogStore = useDialogStore()

const { activeRoleId, roleList } = storeToRefs(roleStore)
const { currentAction } = storeToRefs(dialogStore)

/** 改变角色 */
const onChangeRole = (id: number) => {
    // 编辑状态不允许改变角色
    if (currentAction.value === 'edit') return
    roleStore.changeActiveRoleId(id);
}

onMounted(async () => {
    emits('roles-ready')
})


// 跳转设置角色
const onSettingRole = () => {
    router.push({
        name: 'CreateRole',
        params: {
            bookId: props.bookId,
        },
        query: {
            chapterId: props.chapterId
        }
    })
}
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
