import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	async findByEmail(email: string) {
		return this.findOne({ email });
	}
}
