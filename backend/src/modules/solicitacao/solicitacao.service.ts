import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSolicitacaoDeServicoDTO } from './dto/solicitacao.dto';

@Injectable()
export class SolicitacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ cliente_id, pet_id, prestador_id, inicio, fim, preco_total, status }: CreateSolicitacaoDeServicoDTO) {
    return this.prisma.solicitacaoDeServico.create({
      data: {
        cliente_id,
        pet_id,
        prestador_id,
        inicio,
        fim,
        preco_total,
        status,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.solicitacaoDeServico.findMany({
      include: { Cliente: true, Pet: true, PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.solicitacaoDeServico.findUnique({
      where: { id },
      include: { Cliente: true, Pet: true, PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.solicitacaoDeServico.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.solicitacaoDeServico.delete({ where: { id } });
  }
}