import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, GenerateCodeDTO, ValidateAuthTokenDTO } from './dto/auth.dto';
import { REDIRECT_CODES, ROUTES } from 'src/utils/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* @Post()
  async auth(@Body() data: AuthDTO) {
    const { userType: user_type, phoneNumber } = data;

    let redirectCode: number;

    switch (user_type.toLowerCase()) {
      case 'cliente':
        redirectCode = REDIRECT_CODES.clienteHome;
        break;
      case 'prestador':
        redirectCode = REDIRECT_CODES.prestadorHome;
        break;
      default:
        throw new BadRequestException('Tipo de usuário inválido.');
    }
    return { path: ROUTES[redirectCode] };
  } */

  @Post('validateNumberCode')
  async validateNumberValidationCode(
    @Body()
    data: {
      userType: string;
      phoneNumber: string;
      verificationCode: string;
    },
  ) {
    const { userType, phoneNumber, verificationCode } = data;
    return await this.authService.validateNumberValidationCode(
      userType,
      phoneNumber,
      verificationCode,
    );
  }

  @Post('generateValNumCode')
  async generateValCode(@Body() data: GenerateCodeDTO) {
    const { phoneNumber, userType } = data;

    const result = await this.authService.generateValCode(
      phoneNumber,
      userType,
    );

    return { code: result.code };
  }

  @Post('validateAuthToken')
  async validateAuthToken(@Body() data: ValidateAuthTokenDTO) {
    const { userType: userType, authToken: authToken } = data;

    switch (userType.toLowerCase()) {
      case 'cliente':
        return {
          valid: await this.authService.validateClienteToken(authToken),
        };
      case 'prestador':
        return {
          valid: await this.authService.validatePrestadorToken(authToken),
        };
      default:
        throw new BadRequestException('Tipo de usuário inválido.');
    }
  }
}
