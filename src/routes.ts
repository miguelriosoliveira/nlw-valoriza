import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CreateUserController } from './controllers/CreateUserController';

export const router = Router();

const createUserController = new CreateUserController();

router.post(
	'/users',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			admin: Joi.boolean().default(false),
		},
	}),
	createUserController.handle,
);
