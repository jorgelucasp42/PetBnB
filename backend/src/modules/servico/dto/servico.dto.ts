import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
  Matches,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class CreateServicoDTO {
  @IsString()
  tipo: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsString()
  prestador_id: string;
}

export class ServicoDTO {
  @IsString()
  tipo: string;

  @IsNumber()
  @Min(0)
  preco: number;
}
