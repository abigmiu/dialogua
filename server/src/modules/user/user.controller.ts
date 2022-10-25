import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    CreateUserDto,
    CreateUserResponse,
    LoginDto,
    LoginResponse,
    UpdateUserDto,
} from 'src/dto/user.dto';
import { Public } from 'src/decorator/public';
import { IdParam } from 'src/dto/param.dto';

@ApiTags('用户')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({
        summary: '注册',
    })
    @ApiResponse({
        type: CreateUserResponse,
    })
    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({
        summary: '登录',
    })
    @ApiResponse({
        type: LoginResponse,
    })
    @Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.userService.login(dto);
    }

    @ApiOperation({
        summary: '更新用户信息',
    })
    @Patch(':id')
    update(@Param() param: IdParam, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(param.id, updateUserDto);
    }

    @ApiOperation({
        summary: '冻结用户',
    })
    @Put(':id')
    freeze(@Param() param: IdParam) {
        console.log('');
    }
}
