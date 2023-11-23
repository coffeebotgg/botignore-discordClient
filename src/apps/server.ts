import express from "express";
import env from "../utils/env.process";
import logger from "../utils/logger";

export default class Server {
	private app: express.Application;

	constructor() {
		this.app = express();
	}

	public async start() {
		this.app.listen(env.port, () => {
			logger.server(`Server listening on port ${env.port}`);
		});
	}
}

new Server().start();
