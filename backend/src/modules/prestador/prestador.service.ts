import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestadorDTO } from './dto/prestador.dto';

export class PrestadorService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    nome,
    cpf,
    foto,
    telefone,
    avaliacao,
    descricao,
  }: CreatePrestadorDTO) {
    return this.prisma.prestadorDeServico.create({
      data: {
        nome,
        cpf,
        telefone,
        foto,
        avaliacao,
        descricao,
      },
    });
  }
  async findAll(): Promise<any[]> {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.cliente.delete({ where: { id } });
  }
}
