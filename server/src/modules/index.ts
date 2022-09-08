import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookRoleModule } from './book-role/book-role.module';
import { ChapterModule } from './chapter/chapter.module';
import { RoleModule } from './role/role.module';

const modules = [UserModule, BookModule, BookRoleModule, ChapterModule, RoleModule];

export default modules;
