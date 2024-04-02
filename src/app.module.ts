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

@Module({
  imports: [
    ConfigModuler,
    DataSource,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'tanhomedevserver.ddns.net',
    //   port: 3306,
    //   username: 'root',
    //   password: 'WDR0aDBtZzRudGgwIQ==',
    //   database: 'url_store',
    //   entities: ['dist/typeorm/entities/*.entity{.ts,.js}'],
    //   synchronize: true,:?????????m hihi Khanh :>>>>994999
    // }),
    AuthModule,
    CacheModuler,
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
