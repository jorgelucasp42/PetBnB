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
import { memoryStorage } from 'multer';
import { CreatePrestadorDTO } from './dto/prestador.dto';
import { PrestadorService } from './prestador.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('prestador')
export class PrestadorController {
  constructor(private readonly prestadorService: PrestadorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreatePrestadorDTO,
  ) {
    if (file) {
      // Converte o buffer para base64 e forma a data URL
      const base64 = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64}`;
      data.foto = dataUrl;
    }
    const prestador = await this.prestadorService.create(data);
    return { auth_token: prestador.auth_token };
  }
  @Get()
  async findAll() {
    return this.prestadorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prestadorService.findOne(id);
  }
  @Get('token/:token')
  async findOneByAuthToken(@Param('token') token: string) {
    const userData = await this.prestadorService.findByAuthToken(token);
    if (!userData) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const { id, ...responseData } = userData;
    return responseData;
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
