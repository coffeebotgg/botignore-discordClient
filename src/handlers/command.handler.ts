import { REST, Routes } from "discord.js";
import logger from "../utils/logger";
import { globSync } from "glob";
import DiscordClient from "../apps/client";
import env from "../utils/env.process";
import { rootDir } from "../../config";

export default class CommandHandler {
	private readonly rest = new REST({ version: "9" }).setToken(env.token!);
	private readonly commands = new Map<string, string>();

	public async loadCommands(client: DiscordClient): Promise<void> {
		const files = globSync("./src/interactions/commands/**/*.ts");
		const loadedCommands: string[] = [];

		logger.client(`🔃 Loading ${files.length} commands...`);
		// this.deleteAllCommands(client);

		for (const file of files) {
			const filePath = `${rootDir}/${file}`;
			const command = await import(filePath);

			if (
				!command.default ||
				!command.default.data ||
				!command.default.execute
			)
				continue;

			// prod
			this.rest.post(Routes.applicationCommands(client.user!.id), {
				body: command.default.data,
			});

			// add command to clients collection
			DiscordClient.addCommand(command);

			loadedCommands.push(command.default.name);
		}

		logger.client(`✅ Loaded ${loadedCommands.length} commands!`);
	}

	public async deleteAllCommands(client: DiscordClient): Promise<void> {
		const commands = await client.application?.commands.fetch();

		if (!commands) return;

		for (const command of commands.values()) {
			this.rest.delete(
				Routes.applicationCommand(client.user!.id, command.id)
			);
		}
	}
}
