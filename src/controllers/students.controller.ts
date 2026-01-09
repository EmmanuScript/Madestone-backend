import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { StudentsService } from "../services/students.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("students")
export class StudentsController {
  constructor(private students: StudentsService) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.students.create(body);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to create student",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.students.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to fetch students",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(":id/payment")
  async addPayment(@Param("id") id: string, @Body() body: { amount: number }) {
    try {
      return await this.students.addPayment(+id, body.amount);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to add payment",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Get single student by ID
  @Get(":id")
  async getOne(@Param("id") id: string) {
    try {
      return await this.students.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to fetch student",
        HttpStatus.NOT_FOUND
      );
    }
  }

  // Update student
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  async update(@Req() req: any, @Param("id") id: string, @Body() body: any) {
    try {
      const role = req.user?.role;
      if (role !== "ADMIN" && role !== "CEO") {
        throw new ForbiddenException(
          "Only admin or CEO can edit student details"
        );
      }
      return await this.students.update(+id, body);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new HttpException(
        error.message || "Failed to update student",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
