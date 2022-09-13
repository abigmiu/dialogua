import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString, Length, IsNotEmpty, IsIn } from 'class-validator';
import { IsIncludeBlank } from 'src/decorator/validate';

export class CreateUserDto {
    @ApiProperty({
        description: '邮箱',
        default: 'test@email.com',
    })
    @IsEmail(
        {},
        {
            message: '邮箱格式不正确',
        },
    )
    email: string;

    @ApiProperty({
        description: '密码',
    })
    @IsIncludeBlank()
    @IsNotEmpty({
        message: '密码不能为空',
    })
    password: string;

    @ApiProperty({
        description: '验证码',
    })
    @IsIncludeBlank()
    @IsString()
    code: string;

    @ApiProperty({
        description: '昵称',
        maxLength: 10,
    })
    @IsIncludeBlank()
    @IsString()
    @Length(2, 10, {
        message: '昵称最多为2-10个字',
    })
    nickname: string;
}

export class LoginDto {
    @ApiProperty({
        description: '邮箱',
        default: 'test2@email.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: '密码',
        default: 'string',
    })
    password: string;
}
