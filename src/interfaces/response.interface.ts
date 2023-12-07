interface IError {
	[x: string]: any;
	code: number;
	message: string;
}

interface ISuccess {
	code: number;
	file: string;
}

export interface IGenerateResponse<T extends number> {
	code: T;
	response: T extends 200 ? ISuccess : IError;
}
