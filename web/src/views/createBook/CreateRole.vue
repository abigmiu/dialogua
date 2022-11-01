<!-- 新建角色 -->
<template>
    <div>
        <van-nav-bar
            title='新建角色'
            :right-text="saveLoading ? '保存中' : '保存' "
            left-arrow
            class='mb-5'
            @click-left='onBack'
            @click-right='onSave'
        ></van-nav-bar>
        <div class='role-btns'>
            <div class='role-btn'>
                <div class='title'>左侧角色</div>
                <div class='tip'>可以随意添加多个角色</div>
                <div class='add-icon left' @click='createRole(1)'>
                    <plus-icon fill='#ffffff' size='32' />
                </div>
            </div>
            <div class='role-btn'>
                <div class='title'>右侧角色</div>
                <div class='tip'>可以随意添加多个角色，通常主角在右边</div>
                <div class='add-icon right' @click='createRole(2)'>
                    <plus-icon fill='#ffffff' size='32' />
                </div>
            </div>
        </div>

        <div class='role-list'>
            <role-item
                v-for='item in roleList'
                :key='item.id'
                :source='item'
                @click='editRole(item)'
            ></role-item>
        </div>
        <role-editor
            v-model:visible='editorVisible'
            :roleData='roleData'
            :active-type='activeType'
            @confirm='onConfirm'
        ></role-editor>
    </div>
</template>
<script lang='ts' setup>
import { computed, reactive, ref, onMounted } from 'vue';
import { Plus as PlusIcon } from '@icon-park/vue-next';
import RoleEditor from './components/RoleEditor.vue';
import RoleItem from './components/RoleItem.vue';
import type { ICreateRole, IRole } from '@/types/Role';
import { http } from '@/utils/http';
import { useRequest } from 'vue-request';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookId = Number(route.params.bookId as string);

const editorVisible = ref(false);
const activeType = ref<'add' | 'edit'>('add');

const roleData = ref<ICreateRole>({
    name: '',
    avatar: '',
    side: 1,
    intro: '',
    // id: 0,
});

const fetchRoleList = () => http.get<IRole[]>(`book-role/list/${bookId}`);
const { data, run } = useRequest(fetchRoleList, {
    manual: true,
});
const roleList = computed(() => {
    if (!data.value) return [];
    return reactive(data.value);
});
onMounted(() => {
    const { bookId } = route.params
})

const createRole = (side: 1 | 2) => {
    roleData.value = {
        name: '',
        avatar: '',
        side,
        intro: '',
    };
    activeType.value = 'add';
    editorVisible.value = true;
};

const editRole = (data: IRole) => {
    activeType.value = 'edit';
    roleData.value = data;
    editorVisible.value = true;
};

const onConfirm = (data: IRole) => {
    if (activeType.value === 'add') {
        roleList.value.push(data);
    } else {
        const index = roleList.value.findIndex((item) => item.id === data.id);
        if (index !== -1) {
            roleList.value.splice(index, 1, data);
        }
    }
};

/** 返回 */
const onBack = async () => {
    await router.go(-1);
};
/** 保存 */

const saveLoading = ref(false);
const onSave = async () => {
    if (saveLoading.value) return;
    const { chapterId } = route.query;
    await router.replace({
        name: 'CreateChapter',
        params: {
            bookId: bookId,
            chapterId: chapterId as string,
        },
    });
    

    saveLoading.value = false;
};
</script>
<style lang='scss' scoped>
.role-btns {
    display: flex;

    .role-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tip {
        margin-top: 10px;
        font-size: 10px;
        color: #dad7d7;
        max-width: 100px;
        line-height: 16px;
        height: 48px;
        text-align: center;
    }

    .add-icon {
        margin-top: 15px;
        width: 80px;
        height: 80px;
        background-color: #000;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &.left {
            background-color: #5b8266;
        }

        &.right {
            background-color: #477998;
        }
    }
}

.role-list {
    margin-top: 20px;
}
</style>
