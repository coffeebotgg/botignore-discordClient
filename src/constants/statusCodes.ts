const StatusCodes = {
	OK: 200,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFound: 404,
	UnprocessableEntity: 422,
	InternalServerError: 500,
	MutipleChoice: 300,
	TeaPot: 418,
};

export const getDisplayName = {
	[StatusCodes.OK]: "OK",
	[StatusCodes.BadRequest]: "Bad Request",
	[StatusCodes.Unauthorized]: "Unauthorized",
	[StatusCodes.Forbidden]: "Forbidden",
	[StatusCodes.NotFound]: "Not Found",
	[StatusCodes.UnprocessableEntity]: "Unprocessable Entity",
	[StatusCodes.InternalServerError]: "Internal Server Error",
	[StatusCodes.MutipleChoice]: "Mutiple Choice",
	[StatusCodes.TeaPot]: "I'm a teapot",
};

export default StatusCodes;
