import { BadRequestException } from '@nestjs/common';

export const SAME_EMAIL = '账号已注册';
export const SAME_BOOK_NAME = '书名重复';
export const BOOK_NOT_EXIT = '书本不存在';
export const CREATE_FAIL = '创建失败';

export function badReq(reason: string) {
    throw new BadRequestException(reason);
}
