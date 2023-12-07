import logger from "../utils/logger";
import { globSync } from "glob";
import CommandHandler from "./command.handler";
import env from "../utils/env.process";
import DiscordClient from "../apps/client";
import { rootDir } from "../../config";

export default class EventHandler {
	public async loadEvents(client: DiscordClient): Promise<void> {
		// load event files
		const files = globSync("./src/interactions/events/**/*.ts");
		const loadedEvents: string[] = [];

		// output the length of all files found (used to determine if any events were found and not loaded)
		logger.client(`🔃 Loading ${files.length} events...`);

		for (const file of files) {
			const filePath = `${rootDir}/${file}`;
			const event = await import(filePath);

			// missing event name or execute function
			if (!event.default || !event.default.name || !event.default.execute)
				continue;

			// load events based on once or on (default)
			if (event.default.once) {
				client.once(event.default.name, (...args) =>
					event.default.execute(...args)
				);
			} else {
				client.on(event.default.name, (...args) =>
					event.default.execute(...args)
				);
			}

			// push event name to loaded events array (used to determine if any events were found and loaded)
			loadedEvents.push(event.default.name);
		}

		logger.client(`✅ Loaded ${loadedEvents.length} events!`);

		// internal event ready
		client.once("ready", () => this.Ready(client));
	}

	// ready event to let us know the client is ready and logged in as <displayName>
	public async Ready(client: DiscordClient): Promise<void> {
		logger.client(`🤖 Logged in as ${client.user?.displayName}!`);
		// console log the clients collection

		// get all guilds the bot is in
		const inGuilds = client.guilds.cache.map((guild) => guild);
		logger.client(`🔍 In ${inGuilds.length} guilds!`);

		// during testing we automatically update the commands. This is not recommended for production bots.
		if (!env.prod) {
			await new CommandHandler().loadCommands(client);
		}
	}
}
