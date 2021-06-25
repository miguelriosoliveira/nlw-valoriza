import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

export const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

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

router.post(
	'/tags',
	ensureAdmin,
	celebrate({ [Segments.BODY]: { name: Joi.string().required() } }),
	createTagController.handle,
);
