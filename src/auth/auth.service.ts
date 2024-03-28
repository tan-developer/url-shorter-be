import { jwtModuler } from './module/jwt.module';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';


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
    private jwtService : JwtService
  ){}

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
