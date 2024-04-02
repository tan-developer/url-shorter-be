import { ExtractJwt, Strategy as JwtStrategyInstance } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Scope } from '@nestjs/common';
import * as process from 'process';

@Injectable({
  scope: Scope.DEFAULT,
})
export class JwtStrategy extends PassportStrategy(JwtStrategyInstance) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SCREET_KEY,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
