export const REDIRECT_CODES = {
  login: 1,
  confirmarNumero: 2,
  registrar: 3,
  endereco: 4,
  prestadorHome: 5,
  clienteHome: 6,
  prestadorPerfil: 7,
};

export const ROUTES = {
  [REDIRECT_CODES.login]: '/',
  [REDIRECT_CODES.registrar]: '/registro',
  [REDIRECT_CODES.endereco]: '/endereco',
  [REDIRECT_CODES.prestadorHome]: '/areaprestador',
  [REDIRECT_CODES.clienteHome]: '/buscarservico',
  [REDIRECT_CODES.prestadorPerfil]: '/prestadorperfil',
};
