import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdParam } from 'src/dto/param.dto';
import { CreateBookRoleDto } from 'src/dto/bookRole.dto';
import { BookRoleService } from './book-role.service';
import { Request } from 'express';
import { IJwtData } from 'src/types/user';

@ApiTags('书本角色')
@Controller('book-role')
export class BookRoleController {
    constructor(private readonly bookRoleService: BookRoleService) {}

    @Post(':id')
    @ApiOperation({
        summary: '创建书本角色',
    })
    create(@Param() param: IdParam, @Body() body: CreateBookRoleDto, @Req() request: Request) {
        const user = request.user as IJwtData;

        return this.bookRoleService.create(+param.id, body, user.userId);
    }

    @Get('list/:id')
    @ApiOperation({
        summary: '书本角色列表',
    })
    list(@Param() param: IdParam) {
        return this.bookRoleService.list(param.id);
    }
}
