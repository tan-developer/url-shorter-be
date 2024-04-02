
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const databaseProviders : Provider[] = [
  {
    provide: 'MY_SQL_DATASOURCE',
    inject :[ConfigService],
    useFactory: async (configService : ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<string>('db_type') as 'mysql',
        host: configService.get<string>('db_host'),
        port: configService.get<number>('db_port'),
        username: configService.get<string>('db_user'),
        password:configService.get<string>('db_password'),
        database: configService.get<string>('db_schema'),
        entities: ['dist/typeorm/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
