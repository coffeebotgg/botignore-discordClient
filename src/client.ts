import "./utils/processes";
import DiscordClient from "./apps/client";
import logger from "./utils/logger";

export default class Snowball {
	private client: DiscordClient;

	constructor() {
		this.client = new DiscordClient();
	}

	public async start() {
		await logger.init();

		Promise.all([await this.client.start()]);
	}
}

new Snowball().start();
