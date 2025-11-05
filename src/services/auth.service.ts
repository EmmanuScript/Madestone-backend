import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.users.findByUsername(username);
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.password);
    if (ok) return user;
    return null;
  }

  async login(user: any) {
    console.log("Logging in user:", user);
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}
