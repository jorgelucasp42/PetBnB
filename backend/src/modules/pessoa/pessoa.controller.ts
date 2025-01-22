import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  async create(@Body() data: any) {
    return this.pessoaService.create(data);
  }

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.pessoaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pessoaService.remove(id);
  }
}
