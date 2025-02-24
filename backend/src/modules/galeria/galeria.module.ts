import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { PrestadorModule } from '../prestador/prestador.module';
import { ClienteModule } from '../cliente/cliente.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PrismaModule, ClienteModule, PrestadorModule, UploadModule],
  controllers: [GaleriaController],
  providers: [GaleriaService],
  exports: [GaleriaService],
})
export class GaleriaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GaleriaController);
  }
}
