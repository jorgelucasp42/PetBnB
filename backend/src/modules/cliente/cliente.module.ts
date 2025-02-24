import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
