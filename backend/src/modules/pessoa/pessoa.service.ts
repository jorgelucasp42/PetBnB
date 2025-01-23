import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePessoaDTO } from './dto/pessoa.dto';

@Injectable()
export class PessoaService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar uma nova pessoa
  async create({ nome, cpf, foto, telefone }: CreatePessoaDTO) {
    return this.prisma.pessoa.create({
      data: {
        nome,
        cpf,
        telefone,
        foto,
      },
    });
  }

  // Listar todas as pessoas
  async findAll(): Promise<any[]> {
    return this.prisma.pessoa.findMany();
  }

  // Buscar uma pessoa por ID
  async findOne(id: string): Promise<any> {
    return this.prisma.pessoa.findUnique({ where: { id } });
  }

  // Atualizar uma pessoa
  async update(id: string, data: any): Promise<any> {
    return this.prisma.pessoa.update({ where: { id }, data });
  }

  // Remover uma pessoa
  async remove(id: string): Promise<any> {
    return this.prisma.pessoa.delete({ where: { id } });
  }
}
