import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CacheModuler } from './auth/module/redis.module';
import { ConfigModuler } from './config/ConfigModule';
import { UserModule } from './user/user.module';
import DataSource from './datasource/datasoure.module';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModuler,
    CacheModule.register({
      isGlobal : true,
      store : redisStore,
      host: "localhost",
      port : 6379,
      no_ready_check: true
    }),
    DataSource,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'WDR0aDBtZzRudGgwIQ==',
      database: 'url_store',
      entities: ['dist/typeorm/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide : APP_INTERCEPTOR,
      scope : Scope.REQUEST,
      useClass : TransformationInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes('*')
  }

}
