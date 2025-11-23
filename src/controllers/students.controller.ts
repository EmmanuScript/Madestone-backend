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
} from "@nestjs/common";
import { StudentsService } from "../services/students.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("students")
export class StudentsController {
  constructor(private students: StudentsService) {}

  @Post()
  create(@Body() body: any) {
    return this.students.create(body);
  }

  @Get()
  findAll() {
    return this.students.findAll();
  }

  @Patch(":id/payment")
  addPayment(@Param("id") id: string, @Body() body: { amount: number }) {
    return this.students.addPayment(+id, body.amount);
  }

  // Get single student by ID
  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.students.findOne(+id);
  }

  // Update student
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  update(@Req() req: any, @Param("id") id: string, @Body() body: any) {
    const role = req.user?.role;
    if (role !== "ADMIN" && role !== "CEO") {
      throw new ForbiddenException(
        "Only admin or CEO can edit student details"
      );
    }
    return this.students.update(+id, body);
  }
}
