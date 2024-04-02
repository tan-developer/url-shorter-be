import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './provider/user.provider';

@Module({
  providers: [UserProvider , UserService],
  controllers: [UserController],
  exports : [UserProvider , UserService]
})
export class UserModule {}
