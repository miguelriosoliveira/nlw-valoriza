import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import { TagsRepository } from '../repositories/TagsRepository';

import { IServiceInterface } from './ServiceInterface';

export class CreateTagService implements IServiceInterface {
	async execute(name: string) {
		if (!name) {
			throw new AppError('Invalid name!');
		}

		const tagsRepository = getCustomRepository(TagsRepository);

		const tagExists = await tagsRepository.findByName(name);
		if (tagExists) {
			throw new AppError('Tag already exists!', 403);
		}

		const tag = tagsRepository.create({ name });
		await tagsRepository.save(tag);

		return tag;
	}
}
