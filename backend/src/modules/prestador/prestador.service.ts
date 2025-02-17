import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestadorDTO } from './dto/prestador.dto';
import { randomBytes } from 'crypto';
import { BadRequestException } from '@nestjs/common';

export class PrestadorService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome, cpf, foto, telefone, descricao }: CreatePrestadorDTO) {
    try {
      const existingCliente = await this.prisma.prestadorDeServico.findUnique({
        where: { cpf },
      });

      if (existingCliente) {
        throw new BadRequestException('CPF já cadastrado');
      }

      const prestador = await this.prisma.prestadorDeServico.create({
        data: {
          nome,
          cpf,
          telefone,
          foto,
          descricao,
          avaliacao: 0,
        },
      });

      const authToken = `${prestador.id}-${randomBytes(16).toString('hex')}`;

      await this.prisma.prestadorDeServico.update({
        where: { id: prestador.id },
        data: { auth_token: authToken },
      });

      return { auth_token: authToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('CPF já cadastrado');
      }
      throw error;
    }
  }
  async findAll(): Promise<any[]> {
    return this.prisma.prestadorDeServico.findMany();
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.prestadorDeServico.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.prestadorDeServico.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.prestadorDeServico.delete({ where: { id } });
  }
}
