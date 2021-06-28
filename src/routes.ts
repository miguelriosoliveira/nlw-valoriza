import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

export const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

router.post(
	'/users',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			admin: Joi.boolean().default(false),
		},
	}),
	createUserController.handle,
);

router.post(
	'/authenticate',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	authenticateUserController.handle,
);

router.post(
	'/tags',
	ensureAdmin,
	celebrate({ [Segments.BODY]: { name: Joi.string().required() } }),
	createTagController.handle,
);

router.post(
	'/compliments',
	ensureAdmin,
	celebrate({
		[Segments.BODY]: {
			user_receiver_id: Joi.string().required(),
			tag_id: Joi.string().required(),
			message: Joi.string().required(),
		},
	}),
	createComplimentController.handle,
);
