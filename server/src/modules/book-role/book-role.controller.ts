import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdParam } from 'src/dto/param.dto';
import { CreateBookRoleDto } from 'src/dto/bookRole.dto';
import { BookRoleService } from './book-role.service';
import { Request } from 'express';
import { IJwtData } from 'src/types/user';
import { BookRoleEntity } from 'src/db/bookRole.entity';

@ApiTags('书本角色')
@Controller('book-role')
export class BookRoleController {
    constructor(private readonly bookRoleService: BookRoleService) {}

    @Post(':id')
    @ApiResponse({
        type: BookRoleEntity,
    })
    @ApiOperation({
        summary: '创建书本角色',
    })
    create(@Param() param: IdParam, @Body() body: CreateBookRoleDto, @Req() request: Request) {
        const user = request.user as IJwtData;

        return this.bookRoleService.create(+param.id, body, user.userId);
    }

    @Put(':id')
    @ApiResponse({
        type: BookRoleEntity,
    })
    @ApiOperation({
        summary: '更新书本角色',
    })
    update(@Param() param: IdParam, @Body() body: CreateBookRoleDto) {
        return this.bookRoleService.update(param.id, body);
    }

    @Get('list/:id')
    @ApiOperation({
        summary: '书本角色列表',
    })
    @ApiResponse({
        type: BookRoleEntity,
    })
    list(@Param() param: IdParam) {
        return this.bookRoleService.list(param.id);
    }
}
