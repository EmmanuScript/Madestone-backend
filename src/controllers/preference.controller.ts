import {
  Controller,
  Get,
  Patch,
  Body,
  Post,
  UseGuards,
  Req,
  ForbiddenException,
} from "@nestjs/common";
import { PreferenceService } from "../services/preference.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("preferences")
export class PreferenceController {
  constructor(private pref: PreferenceService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async get(@Req() req: any) {
    // Any authenticated user can view (optional restriction not required)
    return this.pref.get();
  }

  @Patch("session-fee")
  @UseGuards(AuthGuard("jwt"))
  async setFee(@Req() req: any, @Body() body: { sessionFee: number }) {
    if (req.user?.role !== "CEO")
      throw new ForbiddenException("Only CEO can set session fee");
    return this.pref.setSessionFee(body.sessionFee);
  }

  @Patch("session-name")
  @UseGuards(AuthGuard("jwt"))
  async setName(@Req() req: any, @Body() body: { sessionName: string }) {
    if (req.user?.role !== "CEO")
      throw new ForbiddenException("Only CEO can set session name");
    return this.pref.setSessionName(body.sessionName);
  }

  @Post("reset-session")
  @UseGuards(AuthGuard("jwt"))
  async reset(@Req() req: any) {
    if (req.user?.role !== "CEO")
      throw new ForbiddenException("Only CEO can reset session");
    return this.pref.resetSession();
  }
}
