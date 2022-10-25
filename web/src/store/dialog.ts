import { ISection, ISectionCreate } from '@/types/Dialog';
import { defineStore } from 'pinia';
import { useRoleStore } from './role';
import { http } from '@/utils/http';
import { ISectionCreateResponse } from '@/types/Section';

interface IState {
    currentChapterId: string;
    currentContent: string;
    activeSectionId: number;
    activeSection: ISection;
    dialogList: ISection[];
    currentAction: 'insert' | 'delete' | 'edit' | 'upInsert' | 'downInsert';
}

export const useDialogStore = defineStore('dialog', {
    state: (): IState => {
        return {
            currentChapterId: '',
            currentContent: '',
            activeSectionId: 0,
            activeSection: {
                id: 0,
                roleAvatar: '',
                roleId: 0,
                roleName: '',
                side: 0,
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
        changeactiveSectionId(value: number) {
            this.$state.activeSectionId = value;
        },
        emptyId() {
            this.activeSectionId = 0;
        },
        emptyContent() {
            this.currentContent = '';
        },
        resetActionToInset() {
            this.currentAction = 'insert';
        },
        /** 寻找选中的 id 位于列表的位置 */
        findRenderId() {
            const id = this.$state.activeSectionId;
            const index = this.$state.dialogList.findIndex(
                (item) => item.id === id,
            );
            return index;
        },
        /** 处理不同的操作类型 */
        handleAction() {
            const actionType = this.$state.currentAction;
            const roleStore = useRoleStore();
            const role = roleStore.activeRole;
            const roleData = {
                roleId: role.id,
                roleName: role.name,
                roleAvatar: role.avatar,
                side: role.side,
            };


            switch (actionType) {
                case 'insert':
                    this.insert({
                        content: this.$state.currentContent,
                        ...roleData,
                    });
                    break;
                case 'delete':
                    return this.deleteDialog();
                case 'upInsert':
                    this.insertBefore({
                        content: this.$state.currentContent,
                        ...roleData,
                    });
                    break;
                case 'downInsert':
                    this.insertAfter({
                        content: this.$state.currentContent,
                        ...roleData,
                    });
                    break;
                case 'edit':
                    this.edit({
                        id: this.activeSectionId,
                        content: this.$state.currentContent,
                        ...roleData,
                    });
                    break;
                default:
                    break;
            }
        },
        /** 删除一条对话 */
        async deleteDialog() {
            const id = this.activeSectionId;
            await http.delete(`section/${id}`);
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index, 1);
            this.emptyId();
            this.resetActionToInset();
        },
        /** 最后插入一条 */
        async insert(data: ISectionCreate) {
            const submitData = {
                content: data.content,
                roleId: data.roleId,
            }
            const res = await http.post<ISectionCreateResponse>(`section/${this.currentChapterId}`, submitData);
            this.$state.dialogList.push({
                ...data,
                id: res.id,
            });
            this.emptyContent();
        },
        /** 向前插入 */
        async insertBefore(data: ISectionCreate) {
            const submitData = {
                content: data.content,
                roleId: data.roleId,
            }
            const res = await http.post<ISectionCreateResponse>(`section/insertBefore/${this.activeSectionId}`, submitData)
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index, 0, {
                ...data,
                id: res.id
            });
            this.$state.currentContent = '';
        },
        /** 向后插入 */
        async insertAfter(data: ISectionCreate) {
            const submitData = {
                content: data.content,
                roleId: data.roleId,
            }
            const res = await http.post<ISectionCreateResponse>(`section/insertAfter/${this.activeSectionId}`, submitData)
            const index = this.findRenderId();
            if (index === -1) return;
            this.$state.dialogList.splice(index + 1, 0, {
                ...data,
                id: res.id
            });
            this.$state.currentContent = '';
        },
        /** 编辑 */
        async edit(data: ISection) {
            const submitData = {
                content: data.content,
            }
            await http.patch(`section/${data.id}`, submitData);

            const index = this.findRenderId();
            if (index !== -1) {
                this.$state.dialogList.splice(index, 1, data);
            }

            this.emptyContent();
            this.emptyId();
            this.resetActionToInset();
        },
    },
});
