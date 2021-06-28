import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

interface ITokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const { authorization } = request.headers;
	if (!authorization) {
		throw new AppError('Authorization needed!', 401);
	}
	const [, token] = authorization.split(' ');

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		const { sub: user_id } = decoded as ITokenPayload;
		request.user_id = user_id;
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}

	const usersRepository = getCustomRepository(UsersRepository);
	const user = await usersRepository.findById(request.user_id);
	if (!user) {
		throw new AppError('User not found!', 404);
	}
	if (!user.admin) {
		throw new AppError('User is not admin!', 401);
	}

	next();
}
