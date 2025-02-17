import { Module } from '@nestjs/common';
import { SolicitacaoService } from './solicitacao.service';
import { SolicitacaoController } from './solicitacao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SolicitacaoController],
  providers: [SolicitacaoService],
  exports: [SolicitacaoService],
})
export class SolicitacaoModule {}