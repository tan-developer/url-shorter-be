import { Inject, Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { ConnectionNotFoundError, DataSource, Repository } from 'typeorm';
import User from '../typeorm/entities/user.entity';
import { UserRegisterDto } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  private datasource: DataSource;

  constructor(
    @Inject('MY_SQL_DATASOURCE')
    private connection : DataSource,

    @Inject("USER_REPO")
    private userRepo : Repository<User>
  ) {}

  findUserByEmail(email : string) : Promise<User> {
    return this.userRepo.findOneBy({
      _email: email
    })
  }

  saveUser (user : User) : Promise<any> {
    return this.userRepo.save(user)
  }
}
