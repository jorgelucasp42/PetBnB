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
} from 'class-validator';

export class CreatePetDTO {
  @IsString()
  nome: string;

  @IsString()
  especie: string;

  @IsString()
  raca: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsString()
  dono_id: string;
}
export class RecCreatePetDTO {
  @IsString()
  nome: string;

  @IsString()
  especie: string;

  @IsString()
  raca: string;

  @IsOptional()
  foto?: string;
}
