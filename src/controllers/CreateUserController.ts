import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

import { IControllerInterface } from './ControllerInterface';

export class CreateUserController implements IControllerInterface {
	async handle(request: Request, response: Response) {
		const { name, email, admin } = request.body;

		const createUserService = new CreateUserService();
		const user = await createUserService.execute({ name, email, admin });

		response.json(user);
	}
}
