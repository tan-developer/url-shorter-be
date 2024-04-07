import { jwtModuler } from './module/jwt.module';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../dto/createUser.dto';
import User from '../typeorm/entities/user.entity';
import { UserService } from '../user/user.service';
import { ExistingRecordException } from '../exception/existing.exception';

import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as process from 'process';


@Injectable()
export class AuthService {
  constructor(
    private jwtService : JwtService,
    private userService : UserService
  ){}

  async createCredentialAccount (createUserDto : UserRegisterDto) {
    const user : User = await this.userService.findUserByEmail(createUserDto.email);

    if (!_.isEmpty(user)) {
      throw new ExistingRecordException("User exist on system")
    }

    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.fullName = `${String(createUserDto.firstName).trim()} ${String(createUserDto.lastName).trim()}`;
    newUser.password = await bcrypt.hash(createUserDto.password.trim() , 10);

    // this.userService.saveUser(newUser).then(() => {
    //   return this.jwtService.signAsync({ newUser } , {
    //     secret : process.env.SCREET_KEY
    //   }).then((result) => {
    //
    //   })
    // }).catch((error) => {
    //   throw new HttpException("UNABLE TO CREATE ACCOUNT" , 400);
    // })

    const userSave : User= await this.userService.saveUser(newUser);

    if (!_.isEmpty(userSave)) {
      return this.jwtService.signAsync(Object.assign({} , userSave) , {
        secret : process.env.SCREET_KEY
      })
    }else {
      throw new HttpException("UNABLE TO CREATE ACCOUNT" , 400);
    }
  }
  // Validate User (Regular Login)
  validateUser(authPayloadDto: AuthPayloadDto) {
    const findUser = [].find(user => user.username === authPayloadDto.username)

    if (!findUser) throw new HttpException('Invalid Credentials' , HttpStatus.BAD_REQUEST);
    if (authPayloadDto.password === findUser.password) {
      const {password , ...user} = findUser;
      return this.jwtService.sign(user);
    }
  }
}
