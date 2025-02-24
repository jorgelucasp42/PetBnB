import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDTO, ServicoDTO } from './dto/servico.dto';

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  async create(@Body() data: ServicoDTO, @Req() req: any) {
    const createData: CreateServicoDTO = {
      ...data,
      prestador_id: req.user.id as string,
    };
    return this.servicoService.create(createData);
  }

  @Get()
  async findAll() {
    return this.servicoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.servicoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicoService.remove(id);
  }
}
