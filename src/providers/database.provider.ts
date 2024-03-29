import { ConfigService } from '@nestjs/config';
import { DatabaseType, DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService], //no worries for imports because you're using a global module
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<string>('db_type') as 'mysql',
        host: configService.get<string>("db_host"),
        port: configService.get<number>("db_port"),
        username: configService.get<string>("db_user"),
        password: configService.get<string>("db_password"),
        database: configService.get<string>("db_schema"),
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];