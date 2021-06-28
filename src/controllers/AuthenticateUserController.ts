import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

import { IControllerInterface } from './ControllerInterface';

export class AuthenticateUserController implements IControllerInterface {
	async handle(request: Request, response: Response) {
		const { email, password } = request.body;

		const authenticateUserService = new AuthenticateUserService();
		const token = await authenticateUserService.execute({ email, password });

		response.json({ token });
	}
}
