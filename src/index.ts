import "./utils/processes";
import DiscordClient from "./apps/client";
import logger from "./utils/logger";
import Agenda from "./agenda";
/**
 * NOTE: This file is only used during testing for simplicity.
 * run `npm dev:start-client` and `npm dev:start-server` to start the client and server separately.
 */
export default class botignore {
	public async start() {
		await logger.init();

		Promise.all([
			await new DiscordClient().start(),
			await new Agenda().start(),
		]);
	}
}

new botignore().start();
