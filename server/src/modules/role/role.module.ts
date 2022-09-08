import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/db/role.entity';
import { AuthEntity } from 'src/db/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity, AuthEntity])],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
