import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModuler } from './auth/module/redis.module';
import { ConfigModuler } from './config/ConfigModule';
import { DatabaseModule } from './module/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModuler,
    DatabaseModule,
    AuthModule,
    CacheModuler,
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
