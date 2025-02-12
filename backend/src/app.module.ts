import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './modules/cliente/cliente.module';
import { PrestadorModule } from './modules/prestador/prestador.module';
import { PetModule } from './modules/pet/pet.module';
import { ServicoModule } from './modules/servico/servico.module';
import { SolicitacaoModule } from './modules/solicitacao/solicitacao.module';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { GaleriaModule } from './modules/galeria/galeria.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { DisponibilidadeModule } from './modules/disponibilidade/disponibilidade.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Módulo Prisma
    PrismaModule,

    // Módulos principais
    ClienteModule,
    PrestadorModule,
    PetModule,

    // Funcionalidades do sistema
    ServicoModule,
    SolicitacaoModule,
    EnderecoModule,
    GaleriaModule,
    AvaliacaoModule,
    DisponibilidadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
