import { Test, TestingModule } from '@nestjs/testing';
import { PessoaController } from '../modules/pessoa/pessoa.controller';

describe('PessoaController', () => {
  let controller: PessoaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaController],
    }).compile();

    controller = module.get<PessoaController>(PessoaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
