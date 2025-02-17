import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { SolicitacaoService } from './solicitacao.service';
import { CreateSolicitacaoDeServicoDTO } from './dto/solicitacao.dto';

@Controller('solicitacao')
export class SolicitacaoController {
  constructor(private readonly solicitacaoService: SolicitacaoService) {}

  @Post()
  async create(@Body() data: CreateSolicitacaoDeServicoDTO) {
    return this.solicitacaoService.create(data);
  }

  @Get()
  async findAll() {
    return this.solicitacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.solicitacaoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.solicitacaoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.solicitacaoService.remove(id);
  }
}