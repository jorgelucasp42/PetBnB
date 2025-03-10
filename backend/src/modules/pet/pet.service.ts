import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDTO } from './dto/pet.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class PetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async create({ nome, especie, raca, foto, dono_id }: CreatePetDTO) {
    let fotoUrl = '';

    if (foto) {
      fotoUrl = await this.uploadService.uploadImage(
        foto,
        dono_id,
        'pet',
        nome,
      );
    }

    return this.prisma.pet.create({
      data: {
        nome,
        especie,
        raca,
        foto: fotoUrl,
        dono_id,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.pet.findMany({
      where: {
        dono_id: userId,
      },
    });
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.pet.findUnique({
      where: { id },
      include: { Cliente: true },
    });
  }

  async update(id: string, data: any): Promise<any> {
    return this.prisma.pet.update({ where: { id }, data });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.pet.delete({ where: { id } });
  }
}
