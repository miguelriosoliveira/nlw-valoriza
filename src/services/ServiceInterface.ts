export interface IServiceInterface {
	execute(data: unknown): Promise<unknown>;
}
