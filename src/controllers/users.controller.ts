import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { User } from "../entities/user.entity";
import { Express } from "express";

@Controller("users")
export class UsersController {
  constructor(private users: UsersService) {}

  @Post()
  create(@Body() body: any) {
    return this.users.create(body);
  }

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get("coaches")
  coaches() {
    return this.users.findCoaches();
  }

  @Get("admins")
  admins() {
    return this.users.findAdmins();
  }

  @Patch(":id/active")
  setActive(@Param("id") id: string, @Body() b: any) {
    return this.users.setActive(+id, b.active === true || b.active === "true");
  }

  // Get single coach by ID
  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.users.findOne(+id);
  }

  @Patch(":id")
  updateProfile(@Param("id") id: string, @Body() updates: Partial<User>) {
    return this.users.updateProfile(+id, updates);
  }

  @Post(":id/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const name = Date.now() + extname(file.originalname);
          cb(null, name);
        },
      }),
    })
  )
  upload(@Param("id") id: string, @UploadedFile() file: any) {
    return { filename: file.filename };
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.users.delete(+id);
  }
}
