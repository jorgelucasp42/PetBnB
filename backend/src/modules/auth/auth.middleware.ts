import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClienteService } from '../cliente/cliente.service';
import { PrestadorService } from '../prestador/prestador.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly prestadorService: PrestadorService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authtoken as string;
    const userType = req.headers.usertype as string;

    if (!authToken || !userType) {
      throw new UnauthorizedException('Auth Token ou userType não informado.');
    }

    let user;
    if (userType.toLowerCase() === 'cliente') {
      user = await this.clienteService.findByAuthToken(authToken);
    } else if (userType.toLowerCase() === 'prestador') {
      user = await this.prestadorService.findByAuthToken(authToken);
    } else {
      throw new UnauthorizedException('Tipo de usuário inválido.');
    }

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    (req as any).user = user;
    next();
  }
}
