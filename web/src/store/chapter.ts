import { ISection, ISectionAction, ISectionCreate } from '@/types/Dialog';
import type { ISectionCreateResponse } from '@/types/Section';

import { defineStore } from 'pinia';
import { useRoleStore } from './role';

import { http } from '@/utils/http';
import { sectionActionType } from '@/constant';
import { useBookStore } from './book';


interface IState {
    currentBookId: string;
    currentChapterId: string;
    currentContent: string;
    activeSectionId: number;
    activeSection: ISection;
    dialogList: ISection[];
    currentAction: ISectionAction;
    textCount: number;
}

export const useDialogStore = defineStore('chapter', {
    state: (): IState => {
        return {
            currentBookId: '',
            currentChapterId: '',
            currentContent: '',
            activeSectionId: 0,
            activeSection: {
                roleAvatar: '',
                roleId: 0,
                roleName: '',
                side: 0,
                id: 0,
                content: '',
            },
            dialogList: [],
            currentAction: sectionActionType.insert,
            textCount: 0,
        };
    },
    getters: {
        listLength(state) {
            return state.dialogList.length;
        },
    },
    actions: {
        /** 获取章节 ID */
        getCurrentChapterId() {
            if (!this.currentChapterId) {
                const bookStore = useBookStore();
                this.currentChapterId = bookStore.currentChapterId;
            }
            return this.currentChapterId;
        },

        /** 获取数据 */
        async fetchDialog(chapterId: string) {
            const res = await http.get<ISection[]>(`section/list/${chapterId}`)

            const roleStore = useRoleStore();
            const roles = roleStore.roleList;

            res.forEach(section => {
                if (section.roleId === 0) {
                    section.side = 0;
                } else {
                    const index = roles.findIndex((role) => role.id === section.roleId);
                    if (index !== -1) {
                        section.roleAvatar = roles[index].avatar;
                        section.roleName = roles[index].name;
                        section.side = roles[index].side;
                    }
                }
            })
            this.dialogList = res;
        },
        /** 当前编辑的对话框 ID */
        changeactiveSectionId(value: number) {
            this.activeSectionId = value;

            const index = this.findRenderId();
            this.activeSection = this.dialogList[index];
            this.currentContent = this.activeSection.content;
        },
        emptyId() {
            this.activeSectionId = 0;
        },
        emptyContent() {
            this.currentContent = '';
        },
        resetActionToInset() {
            this.currentAction = sectionActionType.edit;
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
        async handleAction() {
            const actionType = this.currentAction;

            const roleStore = useRoleStore();
            const role = roleStore.activeRole;
            const roleData = role

            if (actionType === sectionActionType.insert) {
                await this.insert({
                    content: this.$state.currentContent,
                    ...roleData,
                });
            }

            if (actionType === sectionActionType.upInsert) {
                await this.insertBefore({
                    content: this.$state.currentContent,
                    ...roleData,
                });
            }

            if (actionType === sectionActionType.downInsert) {
                await this.insertAfter({
                    content: this.$state.currentContent,
                    ...roleData,
                });
            }

            if (actionType === sectionActionType.edit) {
                console.log(this.activeSectionId);
                await this.edit({
                    id: this.activeSectionId,
                    content: this.$state.currentContent,
                    ...roleData,
                });
            }
        },
        /** 删除一条对话 */
        async deleteDialog() {
            await http.delete(`section/${this.activeSectionId}`);

            const index = this.findRenderId();
            this.textCount -= this.dialogList[index].content.length;
            this.dialogList.splice(index, 1);
            
            this.emptyId();
            this.resetActionToInset();
        },
        /** 最后插入一条 */
        async insert(data: ISectionCreate) {
            const submitData = {
                content: data.content,
                roleId: data.roleId,
            }
            const res = await http.post<ISectionCreateResponse>(`section/${this.getCurrentChapterId()}`, submitData);
            this.$state.dialogList.push({
                ...data,
                id: res.id,
            });
            this.textCount += data.content.length;
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
            this.textCount += data.content.length;
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
            this.textCount += data.content.length;
            this.$state.currentContent = '';
        },
        /** 编辑 */
        async edit(data: ISection) {
            console.log(data);
            const submitData = {
                content: data.content,
            }
            await http.patch(`section/${data.id}`, submitData);

            const index = this.findRenderId();
            if (index !== -1) {
                this.$state.dialogList.splice(index, 1, data);
                this.textCount = this.textCount - this.dialogList[index].content.length + data.content.length;
            }

            this.emptyContent();
            this.emptyId();
            this.resetActionToInset();
        },
    },
});
