import { Injectable, NotFoundException } from '@nestjs/common';
import { Op, WhereOptions } from 'sequelize';
import { CreateDsrDto } from './dto/create-dsr.dto';
import { UpdateDsrDto } from './dto/update-dsr.dto';
import { Dsr } from './entities/dsr.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DsrService {
  async createDsr(userId: number, createDsrDto: CreateDsrDto) {
    return Dsr.create({ ...createDsrDto, userId });
  }

  async updateDsr(dsrId: number, userId: number, updateDsrDto: UpdateDsrDto) {
    const dsr = await Dsr.findOne({ where: { id: dsrId, userId } });
    if (!dsr) throw new NotFoundException('DSR not found');
    
    return dsr.update(updateDsrDto);
  }

  async findAll(userId: number, startDate?: Date, endDate?: Date, page = 1, limit = 10) {
    const where: WhereOptions<Dsr> = { userId };
    
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    const { count, rows } = await Dsr.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']],
      include: [User],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };
  }

  async findOne(dsrId: number, userId: number) {
    const dsr = await Dsr.findOne({ 
      where: { id: dsrId, userId },
      include: [User],
    });
    
    if (!dsr) throw new NotFoundException('DSR not found');
    return dsr;
  }
}