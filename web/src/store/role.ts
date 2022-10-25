import { IRole } from '@/types/Role';
import { defineStore } from 'pinia';

interface IState {
    activeRoleId: number;
    activeRole: IRole;
    roleList: IRole[];
}

const voiceRole: IRole = {
    id: 0,
    side: 0,
    avatar: '',
    name: '',
    intro: '',
};

export const useRoleStore = defineStore('role', {
    state: (): IState => {
        return {
            activeRoleId: 0,
            activeRole: voiceRole,
            roleList: [],
        };
    },
    actions: {
        /** 修改当前选中的角色 */
        changeActiveRoleId(id: number) {
            this.$state.activeRoleId = id;
            if (id === 0) {
                return (this.$state.activeRole = voiceRole);
            }
            const index = this.$state.roleList.findIndex(
                (item) => item.id === id,
            );
            if (index === -1) {
                console.error(`store role 未找到 id 为 ${id} 的角色`);
            } else {
                this.$state.activeRole = this.$state.roleList[index];
            }
        },
        changeRoleList(list: IRole[]) {
            this.roleList = list;
        },
    },
});
