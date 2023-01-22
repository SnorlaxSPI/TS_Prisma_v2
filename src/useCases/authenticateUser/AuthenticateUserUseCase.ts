import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { client } from '../../prisma/client'

interface IRequest {
  username: string;
  password: string;
};

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    
    // Verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if (!userAlreadyExists) {
      throw new Error('User or password incorrect!');
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error('User or password incorrect!');
    }

    // gerar o token do usuário
    const token = sign({}, '7a85c6a1-8569-42f3-a4ed-20e4ae57db6d', {
      subject: userAlreadyExists.id,
      expiresIn: '20s'
    });

    return { token };
  }
};

export { AuthenticateUserUseCase };