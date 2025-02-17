import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDTO } from './dto/avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async create(@Body() data: CreateAvaliacaoDTO) {
    return this.avaliacaoService.create(data);
  }

  @Get()
  async findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.avaliacaoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.avaliacaoService.remove(id);
  }
}
