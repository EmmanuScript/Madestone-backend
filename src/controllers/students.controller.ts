import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { StudentsService } from "../services/students.service";

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
  update(@Param("id") id: string, @Body() body: any) {
    return this.students.update(+id, body);
  }
}
