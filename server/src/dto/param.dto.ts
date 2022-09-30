import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdParam {
    @ApiProperty({
        description: 'id',
        type: 'integer',
        default: 1,
    })
    @Type(() => Number)
    @IsInt({
        message: 'id只能为整数',
    })
    id: number;
}
