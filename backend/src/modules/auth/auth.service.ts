import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NumValidation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { REDIRECT_CODES, ROUTES } from 'src/utils/constants';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateClienteToken(auth_token: string) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { auth_token },
    });

    if (!cliente || !cliente.expire_date) return false;

    const now = new Date();
    return cliente.expire_date > now;
  }

  async validatePrestadorToken(auth_token: string) {
    const prestador = await this.prisma.prestadorDeServico.findUnique({
      where: { auth_token },
    });

    if (!prestador || !prestador.expire_date) return false;

    const now = new Date();
    return prestador.expire_date > now;
  }

  async validateNumberValidationCode(
    userType: string,
    phoneNumber: string,
    verificationCode: string,
  ) {
    let user: {
      id: string;
      nome: string;
      cpf: string;
      telefone: string;
      foto: string | null;
      auth_token: string | null;
      expire_date: Date | null;
    } | null;
    let redirectCode;

    // Verifica o tipo de usuário
    switch (userType.toLowerCase()) {
      case 'cliente':
        user = await this.prisma.cliente.findUnique({
          where: { telefone: phoneNumber },
        });
        break;
      case 'prestador':
        user = await this.prisma.prestadorDeServico.findUnique({
          where: { telefone: phoneNumber },
        });
        break;
      default:
        throw new BadRequestException('Tipo de usuário inválido.');
    }

    const validationEntry = await this.prisma.numValidation.findUnique({
      where: {
        telephone_userType: {
          telephone: phoneNumber,
          userType: userType.toLowerCase(),
        },
      },
    });

    if (!validationEntry || validationEntry.code !== verificationCode) {
      throw new BadRequestException('Código de validação inválido.');
    }

    await this.prisma.numValidation.delete({
      where: {
        telephone_userType: {
          telephone: phoneNumber,
          userType: userType.toLowerCase(),
        },
      },
    });

    if (!user) {
      // Se o usuário não existir, redireciona para o registro
      redirectCode = REDIRECT_CODES.registrar;
      return { path: ROUTES[redirectCode] };
    }

    if (
      user.auth_token &&
      user.expire_date &&
      new Date(user.expire_date) > new Date()
    ) {
      // Se o token já existir e não tiver expirado, retorna o token existente
      redirectCode =
        userType.toLowerCase() === 'cliente'
          ? REDIRECT_CODES.clienteHome
          : REDIRECT_CODES.prestadorHome;
      return { path: ROUTES[redirectCode], auth_token: user.auth_token };
    }
    // Se o usuário existe, gera um auth_token e salva no banco
    const authToken = `${user.id}-${randomBytes(16).toString('hex')}`;

    if (userType.toLowerCase() === 'cliente') {
      await this.prisma.cliente.update({
        where: { telefone: phoneNumber },
        data: {
          auth_token: authToken,
          expire_date: new Date(new Date().setDate(new Date().getDate() + 10)), // Expira em 10 dias
        },
      });
    } else if (userType.toLowerCase() === 'prestador') {
      await this.prisma.prestadorDeServico.update({
        where: { telefone: phoneNumber },
        data: {
          auth_token: authToken,
          expire_date: new Date(new Date().setDate(new Date().getDate() + 10)), // Expira em 10 dias
        },
      });
    }

    redirectCode =
      userType.toLowerCase() === 'cliente'
        ? REDIRECT_CODES.clienteHome
        : REDIRECT_CODES.prestadorHome;

    return { path: ROUTES[redirectCode], auth_token: authToken };
  }

  async generateValCode(
    phoneNumber: string,
    userType: string,
  ): Promise<NumValidation> {
    const existingEntry = await this.prisma.numValidation.findUnique({
      where: {
        telephone_userType: {
          telephone: phoneNumber,
          userType: userType.toLowerCase(),
        },
      },
    });

    const code = this.generateCode();

    console.log('Codigo Atutenticação: ', code);
    if (!existingEntry) {
      return this.prisma.numValidation.create({
        data: {
          telephone: phoneNumber,
          code: code,
          userType: userType.toLowerCase(),
        },
      });
    }

    return this.prisma.numValidation.update({
      where: {
        id: existingEntry.id,
      },
      data: {
        code: code,
      },
    });
  }

  private generateCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
