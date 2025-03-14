import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Registra o PrismaService como provider
  exports: [PrismaService],   // Exporta o PrismaService para outros módulos
})
export class PrismaModule {}