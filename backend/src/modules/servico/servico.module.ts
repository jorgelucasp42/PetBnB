import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { ClienteModule } from '../cliente/cliente.module';
import { PrestadorModule } from '../prestador/prestador.module';

@Module({
  imports: [PrismaModule, ClienteModule, PrestadorModule],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ServicoController);
  }
}
