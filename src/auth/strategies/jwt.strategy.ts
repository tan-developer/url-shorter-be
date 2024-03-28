import { ExtractJwt, Strategy as JwtStrategyInstance  } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport';
import { Injectable, Scope } from "@nestjs/common";


@Injectable({
  scope : Scope.DEFAULT
})
export class JwtStrategy extends PassportStrategy(JwtStrategyInstance) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey: 'CON CAC TO TO'
    })
  }

  validate(payload : any) {


    return payload;
  }
}