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

export class CreateEnderecoDTO {
  @IsString()
  prestador_id: string;

  @IsString()
  logradouro: string;

  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;
}

export class EnderecoDTO {
  @IsString()
  cep: string;

  @IsString()
  logradouro: string;

  @IsString()
  numero: string;

  @IsString()
  bairro: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;
}
