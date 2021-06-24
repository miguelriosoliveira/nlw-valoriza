import { Request, Response } from 'express';

export interface IControllerInterface {
	handle(request: Request, response: Response): Promise<void>;
}
