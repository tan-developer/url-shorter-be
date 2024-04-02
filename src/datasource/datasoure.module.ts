import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './mysql.datasource';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuler } from '../config/ConfigModule';

@Global()
@Module({
  providers : [...databaseProviders],
  exports : ['MY_SQL_DATASOURCE'],
})
export default  class DataSource {}
