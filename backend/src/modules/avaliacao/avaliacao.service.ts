import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvaliacaoDTO } from './dto/avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ cliente_id, prestador_id, rate, comentario, data }: CreateAvaliacaoDTO) {
    return this.prisma.avaliacao.create({
      data: {
        cliente_id,
        prestador_id,
        rate,
        comentario,
        data,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.avaliacao.findMany({
      include: { Cliente: true, PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.avaliacao.findUnique({
      where: { id },
      include: { Cliente: true, PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.avaliacao.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.avaliacao.delete({ where: { id } });
  }
}
