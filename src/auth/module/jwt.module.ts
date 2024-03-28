import { JwtModule } from "@nestjs/jwt";

export const jwtModuler = JwtModule.register({
  secret : "CON CAC TO TO",
  signOptions : {
    expiresIn : '1h'
  }
})
