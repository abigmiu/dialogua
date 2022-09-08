import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from 'src/dto/param.dto';
import { CreateBookRoleDto } from 'src/dto/bookRole.dto';
import { BookRoleService } from './book-role.service';

@ApiTags('书本角色')
@Controller('book-role')
export class BookRoleController {
    constructor(private readonly bookRoleService: BookRoleService) {}

    @Post(':id')
    create(@Param() param: IdParam, @Body() body: CreateBookRoleDto) {
        return this.bookRoleService.create(+param.id, body);
    }
}
