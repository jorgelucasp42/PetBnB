import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDTO } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome, cpf, foto, telefone }: CreateClienteDTO) {
    return this.prisma.cliente.create({
      data: {
        nome,
        cpf,
        telefone,
        foto,
      },
    });
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
