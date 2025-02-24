import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServicoDTO } from './dto/servico.dto';

@Injectable()
export class ServicoService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ tipo, preco, prestador_id }: CreateServicoDTO) {
    const novoServico = await this.prisma.servico.create({
      data: {
        tipo,
        preco,
        prestador_id,
      },
      select: {
        id: true,
      },
    });
    return novoServico;
  }

  async findAll(): Promise<any[]> {
    return this.prisma.servico.findMany({
      include: { PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.servico.findUnique({
      where: { id },
      include: { PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.servico.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.servico.delete({ where: { id } });
  }
}
