import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookRoleModule } from './book-role/book-role.module';
import { ChapterModule } from './chapter/chapter.module';
import { RoleModule } from './role/role.module';
import { SectionModule } from './section/section.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

const modules = [
    AuthModule,
    UserModule,
    BookModule,
    BookRoleModule,
    ChapterModule,
    RoleModule,
    SectionModule,
    UploadModule,
];

export default modules;
