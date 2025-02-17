import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDTO } from './dto/pet.dto';

@Controller('pet')
export class PetController {
    constructor(private readonly petService: PetService) {}

  @Post()
  async create(@Body() data: CreatePetDTO) {
    return this.petService.create(data);
  }

  @Get()
  async findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.petService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
