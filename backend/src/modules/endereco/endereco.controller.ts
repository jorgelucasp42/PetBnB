import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDTO } from './dto/endereco.dto';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  async create(@Body() data: CreateEnderecoDTO) {
    return this.enderecoService.create(data);
  }

  @Get()
  async findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.enderecoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
