import { Module } from '@nestjs/common';
import { PrestadorController } from './prestador.controller';
import { PrestadorService } from './prestador.service';
import { UploadModule } from '../upload/upload.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [PrestadorController],
  providers: [PrestadorService],
  exports: [PrestadorService],
})
export class PrestadorModule {}
