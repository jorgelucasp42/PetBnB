import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreatePrestadorDTO } from './dto/prestador.dto';
import { PrestadorService } from './prestador.service';

@Controller('prestador')
export class PrestadorController {
  constructor(private readonly prestadorService: PrestadorService) {}

  @Post()
  async create(@Body() data: CreatePrestadorDTO) {
    return this.prestadorService.create(data);
  }
  @Get()
  async findAll() {
    return this.prestadorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prestadorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.prestadorService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prestadorService.remove(id);
  }
}
