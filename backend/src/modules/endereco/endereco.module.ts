import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { ClienteModule } from '../cliente/cliente.module';
import { PrestadorModule } from '../prestador/prestador.module';

@Module({
  imports: [PrismaModule, ClienteModule, PrestadorModule],
  controllers: [EnderecoController],
  providers: [EnderecoService],
  exports: [EnderecoService],
})
export class EnderecoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EnderecoController);
  }
}
