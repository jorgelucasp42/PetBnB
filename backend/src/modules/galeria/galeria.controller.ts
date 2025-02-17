

import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDTO } from './dto/galeria.dto';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Post()
  async create(@Body() data: CreateGaleriaDTO) {
    return this.galeriaService.create(data);
  }

  @Get()
  async findAll() {
    return this.galeriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.galeriaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.galeriaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
