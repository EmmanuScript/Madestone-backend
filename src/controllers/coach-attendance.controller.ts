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
import { CoachAttendanceService } from "../services/coach-attendance.service";

@Controller("coach-attendance")
export class CoachAttendanceController {
  constructor(private service: CoachAttendanceService) {}

  @Post("mark")
  mark(
    @Body()
    body: {
      coachId: number;
      date: string;
      present: boolean;
      markedById?: number;
    }
  ) {
    return this.service.mark(
      body.coachId,
      body.date,
      body.present,
      body.markedById
    );
  }

  @Get("coach/:id")
  getCoach(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    return this.service.getForCoach(id, start, end);
  }

  @Get("center/:id")
  getCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    return this.service.getForCenter(id, start, end);
  }

  @Get("export/center/:id")
  async exportCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: any,
    @Res() res: Response
  ) {
    const { start, end } = query || {};
    const csv = await this.service.exportCenterCsv(id, start, end);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=coach-attendance-center-${id}.csv`
    );
    res.send(csv);
  }
}
