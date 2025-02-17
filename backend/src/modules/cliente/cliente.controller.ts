import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDTO } from './dto/cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() data: CreateClienteDTO) {
    const cliente = await this.clienteService.create(data);
    return { auth_token: cliente.auth_token };
  }
  @Get()
  async findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.clienteService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
