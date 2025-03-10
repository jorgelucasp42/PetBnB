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

  async findAll() {
    const servicos = await this.prisma.servico.findMany({
      include: {
        PrestadorDeServico: {
          include: {
            endereco: true,
            Galeria: { take: 1 }, // Pega apenas a primeira imagem da galeria
          },
        },
      },
    });

    return servicos.map((servico) => ({
      id: servico.id,
      nome: servico.PrestadorDeServico.nome,
      tipo: servico.tipo,
      localizacao: servico.PrestadorDeServico.endereco
        ? `${servico.PrestadorDeServico.endereco.bairro}, ${servico.PrestadorDeServico.endereco.cidade} - ${servico.PrestadorDeServico.endereco.estado}`
        : 'Localização não informada',
      foto:
        servico.PrestadorDeServico.Galeria.length > 0
          ? servico.PrestadorDeServico.Galeria[0].imagem
          : null,
      descricao: servico.PrestadorDeServico.descricao || '',
      preco: servico.preco,
      avaliacao: servico.PrestadorDeServico.avaliacao,
    }));
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
