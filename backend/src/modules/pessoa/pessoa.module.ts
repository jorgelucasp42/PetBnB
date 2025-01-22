import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importa o PrismaModule
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
