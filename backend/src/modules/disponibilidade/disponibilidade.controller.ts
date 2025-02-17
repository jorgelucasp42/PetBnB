import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { DisponibilidadeService } from './disponibilidade.service';
import { CreateDisponibilidadeDTO } from './dto/disponibilidade.dto';

@Controller('disponibilidade')
export class DisponibilidadeController {
  constructor(private readonly disponibilidadeService: DisponibilidadeService) {}

  @Post()
  async create(@Body() data: CreateDisponibilidadeDTO) {
    return this.disponibilidadeService.create(data);
  }

  @Get()
  async findAll() {
    return this.disponibilidadeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.disponibilidadeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.disponibilidadeService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.disponibilidadeService.remove(id);
  }
}
