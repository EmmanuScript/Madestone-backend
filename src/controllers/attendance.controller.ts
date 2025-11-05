import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Res,
  ParseIntPipe,
} from "@nestjs/common";
import { Response } from "express";
import { AttendanceService } from "../services/attendance.service";

@Controller("attendance")
export class AttendanceController {
  constructor(private att: AttendanceService) {}

  @Post("mark")
  mark(
    @Body()
    body: {
      studentId: number;
      date: string;
      present: boolean;
      coachId?: number;
    }
  ) {
    return this.att.mark(body.studentId, body.date, body.present, body.coachId);
  }

  @Get("student/:id")
  getStudent(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    return this.att.getForStudent(id, start, end);
  }

  @Get("center/:id")
  getCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    return this.att.getForCenter(id, start, end);
  }

  @Get("export/center/:id")
  async exportCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: any,
    @Res() res: Response
  ) {
    const { start, end } = query || {};
    const csv = await this.att.exportCenterCsv(id, start, end);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=attendance-center-${id}.csv`
    );
    res.send(csv);
  }
}
