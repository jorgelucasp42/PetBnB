import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreatePrestadorDTO {
  @IsString()
  nome: string;

  @IsString()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos numéricos.',
  })
  cpf: string;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  foto?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
