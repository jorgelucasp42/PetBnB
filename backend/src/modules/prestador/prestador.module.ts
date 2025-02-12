import { Module } from '@nestjs/common';
import { PrestadorController } from './prestador.controller';
import { PrestadorService } from './prestador.service';

@Module({
  imports: [PrestadorModule],
  controllers: [PrestadorController],
  providers: [PrestadorService],
})
export class PrestadorModule {}
