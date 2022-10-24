import { IUserInfo } from '@/types/User';
import { defineStore } from 'pinia';

interface IState {
    userInfo: IUserInfo | null;
}

const getLocalUserInfo = () => {
    const localJSON = localStorage.getItem('userInfo');
    if (!localJSON) return null;

    try {
        return JSON.parse(localJSON) as IUserInfo
    } catch {
        return null;
    }
}

export const useUserStore = defineStore('user', {
    state: (): IState => ({
        userInfo: getLocalUserInfo(),
    }),
    actions: {
        setUser(data: IUserInfo) {
            this.$state.userInfo = data;
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token);
        },
        removeUser() {
            this.$state.userInfo = null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        }
    },
});

export const removeUser = () => {
    const store = useUserStore();
    store.removeUser();
}
