import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEnderecoDTO } from './dto/endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    prestador_id,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
  }: CreateEnderecoDTO) {
    return this.prisma.endereco.create({
      data: {
        prestador_id,
        logradouro,
        numero,
        complemento: complemento ?? '',
        bairro,
        cidade,
        estado,
        cep,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.endereco.findMany({
      include: { PrestadorDeServico: true },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.endereco.findUnique({
      where: { id },
      include: { PrestadorDeServico: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.endereco.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.endereco.delete({ where: { id } });
  }
}
