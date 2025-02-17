import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDTO } from './dto/pet.dto';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome, especie, raca, foto, dono_id }: CreatePetDTO) {
    return this.prisma.pet.create({
      data: {
        nome,
        especie,
        raca,
        foto,
        dono_id,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.pet.findMany({
      include: { Cliente: true },
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
