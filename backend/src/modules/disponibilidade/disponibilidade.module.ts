import { Module } from '@nestjs/common';
import { DisponibilidadeService } from './disponibilidade.service';
import { DisponibilidadeController } from './disponibilidade.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DisponibilidadeController],
  providers: [DisponibilidadeService],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
