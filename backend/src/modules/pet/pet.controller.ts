import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDTO, RecCreatePetDTO } from './dto/pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: RecCreatePetDTO,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    if (file) {
      const base64 = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64}`;
      data.foto = dataUrl;
    }
    const createData: CreatePetDTO = {
      ...data,
      dono_id: userId,
    };
    return this.petService.create(createData);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.id;
    const pets = await this.petService.findAll(userId);
    return pets;
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
