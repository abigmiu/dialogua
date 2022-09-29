import { IUserInfo } from '@/types/User';
import { defineStore } from 'pinia';

interface IState {
    userInfo: IUserInfo | null;
}

export const useUserStore = defineStore('user', {
    state: (): IState => ({
        userInfo: null,
    }),
    actions: {
        setUser(data: IUserInfo) {
            this.$state.userInfo = data;
            localStorage.setItem('token', data.token);
        },
    },
});
