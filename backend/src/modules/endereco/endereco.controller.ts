import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  HttpCode,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDTO, EnderecoDTO } from './dto/endereco.dto';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}
  @Post()
  @HttpCode(201)
  async create(@Body() data: EnderecoDTO, @Req() req: any) {
    const createData: CreateEnderecoDTO = {
      ...data,
      prestador_id: req.user.id as string,
    };
    const enderecoCriado = await this.enderecoService.create(createData);
    const { prestador_id, ...enderecoSemPrestadorId } = enderecoCriado;

    return enderecoSemPrestadorId;
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
