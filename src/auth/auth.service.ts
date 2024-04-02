import { jwtModuler } from './module/jwt.module';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../dto/createUser.dto';
import User from '../typeorm/entities/user.entity';
import { UserService } from '../user/user.service';


const userFake = [
  {
    id : 2,
    username : 'jack',
    password : 'password123'
  },
  {
    id : 3,
    username : 'kicm',
    password : 'hashpassword'
  },
]

@Injectable()
export class AuthService {
  constructor(
    private jwtService : JwtService,
    private userService : UserService
  ){}

  async createCredentialAccount (createUserDto : UserRegisterDto) {
    const user : User = await this.userService.findUserById(createUserDto.email);


  }
  // Validate User (Regular Login)
  validateUser(authPayloadDto: AuthPayloadDto) {
    const findUser = userFake.find(user => user.username === authPayloadDto.username)

    if (!findUser) throw new HttpException('Invalid Credentials' , HttpStatus.BAD_REQUEST);
    if (authPayloadDto.password === findUser.password) {
      const {password , ...user} = findUser;

      return this.jwtService.sign(user);
    }
  }
}
