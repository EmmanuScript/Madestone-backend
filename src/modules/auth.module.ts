import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./users.module";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { JwtStrategy } from "../services/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "change_this_secret",
      signOptions: { expiresIn: "12h" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
