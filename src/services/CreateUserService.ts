import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

import { IServiceInterface } from './ServiceInterface';

interface IUserData {
	name: string;
	email: string;
	admin?: boolean;
}

export class CreateUserService implements IServiceInterface {
	async execute({ name, email, admin }: IUserData) {
		if (!name) {
			throw new AppError('Invalid name!');
		}

		if (!email) {
			throw new AppError('Invalid e-mail!');
		}

		const usersRepository = getCustomRepository(UsersRepository);

		const userExists = await usersRepository.findByEmail(email);
		if (userExists) {
			throw new AppError('E-mail already in use!');
		}

		const user = usersRepository.create({ name, email, admin });
		await usersRepository.save(user);

		return user;
	}
}
