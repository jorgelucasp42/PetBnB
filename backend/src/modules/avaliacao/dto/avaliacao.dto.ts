import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsDate, Matches, Min, Max, IsArray } from 'class-validator';

export class CreateAvaliacaoDTO {
    @IsString()
    cliente_id: string;
  
    @IsString()
    prestador_id: string;
  
    @IsNumber()
    @Min(1)
    @Max(5)
    rate: number;
  
    @IsString()
    comentario: string;
  
    @Transform(({ value }) => new Date(value))
    @IsDate()
    data: Date;
  }