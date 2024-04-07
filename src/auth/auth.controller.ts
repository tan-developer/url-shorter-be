import { AuthService } from './auth.service';
import { Body, Controller, HttpException, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthPayloadDto } from '../dto/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import type { Request } from 'express';
import { Cache, CACHE_MANAGER , CacheInterceptor , CacheTTL } from '@nestjs/cache-manager';
import { APP_PATH } from '../constant/AppPath';
import { UserRegisterDto } from '../dto/createUser.dto';

@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}


  @Post(APP_PATH.REGISTER)
  protected credentialRegister (@Body() createUserDto : UserRegisterDto) {
     // throw new Error('asd')
    return this.authService.createCredentialAccount(createUserDto)
  }

  @Post('login')
  // @UseGuards(LocalGuard)
  protected async login() {
  // @Body() authPayload: AuthPayloadDto
    // return this.authService.validateUser(authPayload);
    return await this.cacheService.get("1234");
  }

  @Post('status')
  protected async gredd(@Req() req: Request) {
    console.log(new Date())
    await this.cacheService.reset()
    await this.cacheService.set("1234", { 'asd' : '123'}  , {
      ttl : 10
    }) ;
    return await this.cacheService.get("1234");
  }
}
