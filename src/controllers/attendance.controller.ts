import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Res,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { AttendanceService } from "../services/attendance.service";

@Controller("attendance")
export class AttendanceController {
  constructor(private att: AttendanceService) {}

  @Post("mark")
  async mark(
    @Body()
    body: {
      studentId: number;
      date: string;
      present: boolean;
      coachId?: number;
    }
  ) {
    try {
      return await this.att.mark(
        body.studentId,
        body.date,
        body.present,
        body.coachId
      );
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to mark attendance",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get("student/:id")
  async getStudent(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    try {
      return await this.att.getForStudent(id, start, end);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to get student attendance",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("center/:id")
  async getCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query("start") start?: string,
    @Query("end") end?: string
  ) {
    try {
      return await this.att.getForCenter(id, start, end);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to get center attendance",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("export/center/:id")
  async exportCenter(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: any,
    @Res() res: Response
  ) {
    try {
      const { start, end } = query || {};
      const csv = await this.att.exportCenterCsv(id, start, end);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=attendance-center-${id}.csv`
      );
      res.send(csv);
    } catch (error) {
      throw new HttpException(
        error.message || "Failed to export attendance",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
