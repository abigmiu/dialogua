export  type IRole = {
    id?: number; // id 为 0 是旁白
    // type: 'text' | 'voiceover';
    side: number; // 1 为 left， 2 为 right
    name: string;
    intro: string;
    avatar: string;
}
