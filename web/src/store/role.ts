/**
 * 角色 store
 */

import { IActiveRole, IRole } from '@/types/Role';
import { http } from '@/utils/http';
import { defineStore } from 'pinia';
import { useDialogStore } from './chapter';

interface IState {
    currentBookId: string;
    activeRoleId: number;
    activeRole: IActiveRole;
    roleList: IRole[];
}

const voiceRole: IActiveRole = Object.freeze({
    side: 0,
    roleAvatar: '',
    roleName: '',
    roleId: 0,
});

export const useRoleStore = defineStore('role', {
    state: (): IState => {
        return {
            currentBookId: '',
            activeRoleId: 0,
            activeRole: voiceRole,
            roleList: [],
        };
    },
    actions: {
        /** 修改当前选中的角色 */
        changeActiveRoleId(id: number) {
            this.activeRoleId = id;

            if (id === 0) {
                return this.activeRole = voiceRole;
            }

            const index = this.roleList.findIndex((item) => item.id === id);
            if (index === -1) {
                return console.error(`store role 未找到 id 为 ${id} 的角色`);
            }

            const role = this.roleList[index];
            this.activeRole = {
                roleId: role.id,
                roleAvatar: role.avatar,
                roleName: role.name,
                side: role.side
            };
        },
        /** 获取当前书本的角色 */
        async fetchRoleList(bookId: string) {
            if (bookId ===  this.currentBookId) {
                return this.roleList;
            }
            
            const res = await http.get<IRole[]>(`book-role/list/${bookId}`);
            this.roleList = res;
            return res;
        }
    },
});
