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
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message:
      'CPF deve conter exatamente 11 dígitos numéricos, com pontos e traços no formato xxx.xxx.xxx-xx.',
  })
  cpf: string;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
