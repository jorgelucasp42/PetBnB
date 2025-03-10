import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClienteModule } from '../cliente/cliente.module';
import { AuthMiddleware } from '../auth/auth.middleware';
import { PrestadorModule } from '../prestador/prestador.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PrismaModule, ClienteModule, PrestadorModule, UploadModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PetController);
  }
}
