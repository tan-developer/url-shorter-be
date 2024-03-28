import { ConfigService } from '@nestjs/config';
import { DatabaseType, DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService], //no worries for imports because you're using a global module
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<string>('db_type') as DatabaseType ,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];