import { JwtModule } from "@nestjs/jwt";

export const jwtModuler = JwtModule.register({
  secret : process.env.SCREET_KEY,
  signOptions : {
    expiresIn : '1h'
  }
})
