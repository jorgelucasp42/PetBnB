import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrestadorDTO } from './dto/prestador.dto';
import { randomBytes } from 'crypto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PrestadorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create({ nome, cpf, foto, telefone, descricao }: CreatePrestadorDTO) {
    const existingPrestador = await this.prisma.prestadorDeServico.findUnique({
      where: { cpf },
    });

    if (existingPrestador) {
      throw new BadRequestException('CPF já cadastrado');
    }

    // Se houver foto e for necessário realizar o upload
    if (foto) {
      const uploadedUrl = await this.uploadService.uploadImage(
        foto,
        cpf,
        'prestador',
      );
      foto = uploadedUrl; // Atualiza com a URL retornada
    }

    try {
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
    return this.prisma.prestadorDeServico.findMany();
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.prestadorDeServico.findUnique({ where: { id } });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.prestadorDeServico.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    const prestador = await this.prisma.prestadorDeServico.findUnique({
      where: { id },
    });
    if (!prestador) {
      throw new NotFoundException('Prestador não encontrado');
    }

    // Se existir uma foto, utiliza o UploadService para removê-la do Cloudinary
    if (prestador.foto) {
      await this.uploadService.removeImage(prestador.foto);
    }

    return this.prisma.prestadorDeServico.delete({ where: { id } });
  }
  async findByAuthToken(authToken: string) {
    return this.prisma.prestadorDeServico.findUnique({
      where: { auth_token: authToken },
    });
  }
}
