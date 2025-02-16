import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsUrl, IsDate, Matches, Min, Max, IsArray } from 'class-validator';

export class CreateSolicitacaoDeServicoDTO {
    @IsString()
    cliente_id: string;
  
    @IsString()
    pet_id: string;
  
    @IsString()
    prestador_id: string;
  
    @Transform(({ value }) => new Date(value))
    @IsDate()
    inicio: Date;
  
    @Transform(({ value }) => new Date(value))
    @IsDate()
    fim: Date;
  
    @IsNumber()
    @Min(0)
    preco_total: number;
  
    @IsString()
    status: string;
  }