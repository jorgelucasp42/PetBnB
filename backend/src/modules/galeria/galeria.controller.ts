import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDTO, GaleriaDTO } from './dto/galeria.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from '../upload/upload.service';

@Controller('galeria')
export class GaleriaController {
  constructor(
    private readonly galeriaService: GaleriaService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagem', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: GaleriaDTO,
    @Req() req: any,
  ) {
    const prestadorId = req.user.id;

    // Extrair itens da galeria
    // Converte a imagem para base64
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Realiza o upload da imagem para o Cloudinary
    const secureUrl = await this.uploadService.uploadGalleryImage(
      base64,
      prestadorId,
      'prestador',
    );

    const galleryDto: CreateGaleriaDTO = {
      prestador_id: prestadorId,
      imagem: secureUrl,
      nome: data.nome,
      descricao: data.descricao || '',
    };

    // Criação do registro da galeria
    const created = await this.galeriaService.create(galleryDto);
    return created;
  }

  @Get()
  async findAll() {
    return this.galeriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.galeriaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.galeriaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
