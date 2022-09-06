import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { IsIncludeBlank } from 'src/decorator/validate';

export class CreateBookDto {
    @ApiProperty({
        description: '书本名称',
    })
    @IsString()
    @IsIncludeBlank()
    @Length(1, 20, {
        message: '书本名称为2-10个字',
    })
    title: string;

    @ApiPropertyOptional({
        description: '简介',
    })
    @IsOptional()
    @IsString()
    @MaxLength(200, {
        message: '书本简介不能超过200字',
    })
    intro?: string;

    @ApiProperty({
        description: '封面图',
    })
    @IsOptional()
    cover?: string;
}
