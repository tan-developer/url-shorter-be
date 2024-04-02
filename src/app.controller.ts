import { Controller, Get, HttpException, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource, QueryRunner } from 'typeorm';
import { Connection } from 'mysql2';
import User from './typeorm/entities/user.entity';
import { TransformationInterceptor } from './interceptors/transform.interceptor';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MY_SQL_DATASOURCE')
    private connection : Promise<DataSource>
  ) {}

  @Get('/test')
  protected async getHello() {
    // const connetion : DataSource = await this.connection
    // const runner  :Promise<User[]> = connetion.createQueryRunner().query('select * from user');
    // throw new HttpException('test' , 401);
    return ['asd'];
  }
}
