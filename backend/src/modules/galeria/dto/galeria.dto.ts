import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsDate, Matches, Min, Max, IsArray } from 'class-validator';

export class CreateGaleriaDTO {
    @IsString()
    prestador_id: string;
  
    @IsString()
    @IsUrl()
    imagem: string;
  
    @IsString()
    nome: string;
  
    @IsOptional()
    @IsString()
    descricao?: string;
  }
  