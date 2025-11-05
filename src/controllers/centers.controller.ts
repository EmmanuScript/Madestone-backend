import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CentersService } from "../services/centers.service";
import { StudentsService } from "../services/students.service";

@Controller("centers")
export class CentersController {
  constructor(
    private centers: CentersService,
    private studentsService: StudentsService
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.centers.create(body);
  }

  @Get()
  findAll() {
    return this.centers.findAll();
  }

  @Get(":id/students")
  getStudents(@Param("id") id: string) {
    return this.studentsService.findByCenter(+id);
  }
}
