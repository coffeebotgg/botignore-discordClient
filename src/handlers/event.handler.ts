import logger from "../utils/logger";
import { globSync } from "glob";
import CommandHandler from "./command.handler";
import Env from "../utils/env.process";
import DiscordClient from "../apps/client";

export default class EventHandler {
	public async loadEvents(client: DiscordClient): Promise<void> {
		const root = process.cwd();
		const files = globSync("./src/interactions/events/**/*.ts");
		const loadedEvents: string[] = [];

		logger.client(`🔃 Loading ${files.length} events...`);

		for (const file of files) {
			const filePath = `${root}/${file}`;
			const event = await import(filePath);

			if (!event.default || !event.default.name || !event.default.execute)
				continue;

			if (event.default.once) {
				client.once(event.default.name, (...args) =>
					event.default.execute(...args)
				);
			} else {
				client.on(event.default.name, (...args) =>
					event.default.execute(...args)
				);
			}

			loadedEvents.push(event.default.name);
		}

		logger.client(`✅ Loaded ${loadedEvents.length} events!`);

		// internal event ready
		client.once("ready", (...args) => this.Ready(client));
	}

	public async Ready(client: DiscordClient): Promise<void> {
		logger.client(`🤖 Logged in as ${client.user?.displayName}!`);
		// console log the clients collection

		// get all guilds the bot is in
		const inGuilds = client.guilds.cache.map((guild) => guild);
		logger.client(`🔍 In ${inGuilds.length} guilds!`);

		new CommandHandler().loadCommands(client);
	}
}
