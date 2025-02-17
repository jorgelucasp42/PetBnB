import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDisponibilidadeDTO } from './dto/disponibilidade.dto';

@Injectable()
export class DisponibilidadeService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ prestador_id, dia_semana, inicio, fim }: CreateDisponibilidadeDTO) {
    return this.prisma.disponibilidade.create({
      data: {
        prestador_id,
        dia_semana,
        inicio,
        fim,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.disponibilidade.findMany({
      include: { PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.disponibilidade.findUnique({
      where: { id },
      include: { PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.disponibilidade.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.disponibilidade.delete({ where: { id } });
  }
}