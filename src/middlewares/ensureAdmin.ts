import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const isAdmin = true;

	if (!isAdmin) {
		response.status(401).json({ error: 'User is not admin!' });
		return;
	}

	next();
}
