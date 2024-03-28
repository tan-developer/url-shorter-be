import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheModuler } from './auth/module/redis.module';
import { ConfigModuler } from './config/ConfigModule';

@Module({
  imports: [ConfigModuler , AuthModule , CacheModuler],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
