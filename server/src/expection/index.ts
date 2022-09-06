import { BadRequestException } from '@nestjs/common';

export const SAME_EMAIL = '账号已注册';
export const SAME_BOOK_NAME = '书名重复';

export function badReq(reason: string) {
    throw new BadRequestException(reason);
}
