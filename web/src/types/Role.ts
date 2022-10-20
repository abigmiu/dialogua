export  type IRole = {
    id?: number; // id 为 0 是旁白
    // type: 'text' | 'voiceover';
    side: 'left' | 'right';
    name: string;
    introduction: string;
    avatar: string;
}
