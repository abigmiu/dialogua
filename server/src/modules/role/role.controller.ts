import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/dto/role.dto';
import { RoleService } from './role.service';

@ApiTags('角色')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    create(@Body() body: CreateRoleDto) {
        return this.roleService.create(body);
    }
}
