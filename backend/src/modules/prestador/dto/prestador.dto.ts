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
  @Matches(/^\+55\d{2}9?\d{8}$/, {
    message:
      'O número de telefone deve ser um número brasileiro válido no formato E.164',
  })
  telefone: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  foto?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  avaliacao: number;
}
