import { IDialog } from '@/types/Dialog';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useRoleStore } from './role';

interface IState {
    currentContent: string;
    activeDialogId: string | null;
    activeDialog: IDialog;
    dialogList: IDialog[];
    currentAction: 'insert' | 'delete' | 'edit' | 'upInsert' | 'downInsert';
}

export const useDialogStore = defineStore('dialog', {
    state: (): IState => {
        return {
            currentContent: '',
            activeDialogId: null,
            activeDialog: {
                roleAvatar: '',
                roleId: 0,
                roleName: '',
                id: 0,
                type: 'voiceover',
                renderId: '',
                content: '',
            },
            dialogList: [],
            currentAction: 'insert',
        };
    },
    getters: {
        listLength(state) {
            return state.dialogList.length;
        },
    },
    actions: {
        /** 当前编辑的对话框 ID */
        changeActiveDialogId(value: string | null) {
            this.$state.activeDialogId = value;
        },
        findRenderId() {
            const renderId = this.$state.activeDialogId;
            const index = this.$state.dialogList.findIndex(
                (item) => item.renderId === renderId,
            );
            return index;
        },
        handleAction() {
            const actionType = this.$state.currentAction;
            const roleStore = useRoleStore();
            const role = roleStore.activeRole;
            const roleData = {
                roleId: role.id,
                roleName: role.name,
                roleAvatar: role.avatar,
                side: role.side,
                type: role.type,
            };
            switch (actionType) {
                case 'insert':
                    this.insert({
                        content: this.$state.currentContent,
                        renderId: uuid(),
                        ...roleData,
                    });
                    break;
                case 'delete':
                    this.deleteDialog();
                default:
                    break;
            }
        },
        /** 删除一条对话 */
        deleteDialog() {
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index, 1);
        },
        /** 最后插入一条 */
        insert(data: IDialog) {
            this.$state.dialogList.push(data);
            this.$state.currentContent = '';
        },
        insertBefore(renderId: string, data: IDialog) {
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index, 0, data);
        },
        insertAfter(renderId: string, data: IDialog) {
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index + 1, 0, data);
        },
    },
});
