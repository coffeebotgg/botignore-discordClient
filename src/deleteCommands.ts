import "./utils/processes";
import DiscordClient from "./apps/client";
/**
 * NOTE: This file is only used during testing for simplicity.
 * run `npm dev:start-client` and `npm dev:start-server` to start the client and server separately.
 */
export default class botignore {
	public async start() {
		const client = new DiscordClient();
		await client.delete();
	}
}

new botignore().start();
