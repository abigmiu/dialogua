import { Module } from '@nestjs/common';
import { BookRoleService } from './book-role.service';
import { BookRoleController } from './book-role.controller';

@Module({
  controllers: [BookRoleController],
  providers: [BookRoleService]
})
export class BookRoleModule {}
