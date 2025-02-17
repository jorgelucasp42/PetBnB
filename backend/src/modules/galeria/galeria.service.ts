import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGaleriaDTO } from './dto/galeria.dto';

@Injectable()
export class GaleriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ prestador_id, imagem, nome, descricao }: CreateGaleriaDTO) {
    return this.prisma.galeria.create({
      data: {
        prestador_id,
        imagem,
        nome,
        descricao: descricao ?? '',
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.galeria.findMany({
      include: { PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.galeria.findUnique({
      where: { id },
      include: { PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.galeria.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.galeria.delete({ where: { id } });
  }
}