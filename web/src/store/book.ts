import { defineStore } from "pinia";

import { useRoleStore } from './role';
import { useDialogStore } from './chapter';

interface IState {
    currentBookId: string;
    currentChapterId: string;
}

export const useBookStore = defineStore('book', {
    state: (): IState => ({
        currentBookId: '',
        currentChapterId: '',
    }),
    actions: {
        async changeBookId(id: string) {
            this.currentBookId = id;
            
            const roleStore = useRoleStore();
            await roleStore.fetchRoleList(id);   
        },
        async changeChapterId(id: string) {
            this.currentChapterId = id;

            const dialogStore = useDialogStore();
            dialogStore.fetchDialog(id);
        }
    }
})