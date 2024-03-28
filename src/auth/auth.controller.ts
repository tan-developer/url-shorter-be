import { AuthService } from './auth.service';
import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import type { Request } from 'express';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  protected login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.validateUser(authPayload);
  }

  @Post('status')
  protected async gredd(@Req() req: Request) {
    await this.cacheService.set("1234", 123);
    return await this.cacheService.get("1234");
  }
}