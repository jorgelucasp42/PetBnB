import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  userType: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsOptional()
  @IsString()
  verificationCode: string;
}

export class ValidateAuthTokenDTO {
  @IsNotEmpty()
  @IsString()
  userType: string;
  @IsNotEmpty()
  @IsString()
  authToken: string;
}

export class GenerateCodeDTO {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @IsNotEmpty()
  @IsString()
  userType: string;
}
