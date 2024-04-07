import { FindOneOptions, Repository } from 'typeorm';
import User from '../typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
      @InjectRepository(User)
      repository: Repository<User>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
