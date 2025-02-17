import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDTO } from './dto/cliente.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome, cpf, foto, telefone }: CreateClienteDTO) {
    try {
      // Verifica se o CPF já existe
      const existingCliente = await this.prisma.cliente.findUnique({
        where: { cpf },
      });

      if (existingCliente) {
        throw new BadRequestException('CPF já cadastrado');
      }

      // Criação do cliente
      const cliente = await this.prisma.cliente.create({
        data: {
          nome,
          cpf,
          telefone,
          foto,
        },
      });

      const authToken = `${cliente.id}-${randomBytes(16).toString('hex')}`;

      // Atualiza o auth_token
      await this.prisma.cliente.update({
        where: { id: cliente.id },
        data: {
          auth_token: authToken,
          expire_date: new Date(new Date().setDate(new Date().getDate() + 10)),
        },
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
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.cliente.delete({ where: { id } });
  }
}
