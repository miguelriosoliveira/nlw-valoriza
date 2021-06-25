import { Request, Response } from 'express';

import { CreateTagService } from '../services/CreateTagService';

import { IControllerInterface } from './ControllerInterface';

export class CreateTagController implements IControllerInterface {
	async handle(request: Request, response: Response) {
		const { name } = request.body;

		const createTagService = new CreateTagService();
		const tag = await createTagService.execute(name);

		response.json(tag);
	}
}
