//INF: interface para os dados de entrada no caso de uso. Isso é mais simples e desacoplado do banco de dados
export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  photo?: string;
}
