import { Module } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GaleriaController],
  providers: [GaleriaService],
  exports: [GaleriaService],
})
export class GaleriaModule {}
