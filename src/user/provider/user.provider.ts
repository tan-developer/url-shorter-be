import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import User from '../../typeorm/entities/user.entity';
import { DataSource } from 'typeorm';

export const UserProvider : Provider = {
  inject : ['MY_SQL_DATASOURCE'],
  useFactory : (dataSource : DataSource) => dataSource.getRepository(User),
  provide : "USER_REPO"
}
