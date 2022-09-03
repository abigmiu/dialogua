export interface IRole {
    id?: number;
    side: 'left' | 'right' | 'voiceover';
    name: string;
    introduction?: string;
    avatar: string;
}
