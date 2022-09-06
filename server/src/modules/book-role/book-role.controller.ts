import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookRoleService } from './book-role.service';

@ApiTags('书本角色')
@Controller('book-role')
export class BookRoleController {
    constructor(private readonly bookRoleService: BookRoleService) {}
}
