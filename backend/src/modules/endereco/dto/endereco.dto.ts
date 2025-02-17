import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsDate, Matches, Min, Max, IsArray } from 'class-validator';

export class CreateEnderecoDTO {
    @IsString()
    prestador_id: string;
  
    @IsString()
    rua: string;
  
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