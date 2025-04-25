import { Controller, Post, Body, Get, Query, Param, Put, UseGuards, Req } from '@nestjs/common';
import { DsrService } from './dsr.service';
import { CreateDsrDto } from './dto/create-dsr.dto';
import { UpdateDsrDto } from './dto/update-dsr.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
  };
}

@Controller('users/api/v1/dsr')
@UseGuards(AuthGuard('jwt'))
export class DsrController {
  constructor(private readonly dsrService: DsrService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() createDsrDto: CreateDsrDto) {
    return this.dsrService.createDsr(req.user.userId, createDsrDto);
  }

  @Put()
  update(@Req() req: AuthenticatedRequest, @Body() updateDsrDto: UpdateDsrDto) {
    return this.dsrService.updateDsr(updateDsrDto.dsrId, req.user.userId, updateDsrDto);
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.dsrService.findAll(req.user.userId, startDate, endDate, page, limit);
  }

  @Get(':dsrId')
  findOne(@Req() req: AuthenticatedRequest, @Param('dsrId') dsrId: string) {
    return this.dsrService.findOne(+dsrId, req.user.userId);
  }
}
