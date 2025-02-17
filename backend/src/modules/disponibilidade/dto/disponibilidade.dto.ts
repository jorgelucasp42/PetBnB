import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsDate, Matches, Min, Max, IsArray } from 'class-validator';

export class CreateDisponibilidadeDTO {
    @IsString()
    prestador_id: string;
  
    @IsString()
    dia_semana: string;
  
    @Transform(({ value }) => new Date(value))
    @IsDate()
    inicio: Date;
  
    @Transform(({ value }) => new Date(value))
    @IsDate()
    fim: Date;
  }
  