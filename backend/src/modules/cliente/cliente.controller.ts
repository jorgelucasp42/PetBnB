import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDTO } from './dto/cliente.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateClienteDTO,
  ) {
    if (file) {
      // Converte o buffer para base64 e forma a data URL
      const base64 = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64}`;
      data.foto = dataUrl;
    }
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
  @Get('token/:token')
  async findOneByAuthToken(@Param('token') token: string) {
    const userData = await this.clienteService.findByAuthToken(token);
    if (!userData) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const { id, ...responseData } = userData;
    return responseData;
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
