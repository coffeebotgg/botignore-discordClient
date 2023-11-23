import { REST, Routes } from "discord.js";
import logger from "../utils/logger";
import { globSync } from "glob";
import DiscordClient from "../apps/client";
import env from "../utils/env.process";

export default class CommandHandler {
	private readonly rest = new REST({ version: "9" }).setToken(env.token!);
	private readonly commands = new Map<string, string>();

	public async loadCommands(client: DiscordClient): Promise<void> {
		const root = process.cwd();
		const files = globSync("./src/interactions/commands/**/*.ts");
		const loadedCommands: string[] = [];

		logger.client(`🔃 Loading ${files.length} commands...`);

		for (const file of files) {
			const filePath = `${root}/${file}`;
			const command = await import(filePath);

			if (
				!command.default ||
				!command.default.data ||
				!command.default.execute
			)
				continue;

			// prod
			if (env.prod) {
				this.rest.put(Routes.applicationCommands(client.user!.id), {
					body: command.default.data,
				});
			} else {
				// https://discord.com/api/oauth2/authorize?client_id=1169750328292429834&permissions=551903332352&scope=bot
				this.rest.post(
					Routes.applicationGuildCommands(
						client.user!.id,
						"1133399514707935344"
					),
					{
						body: command.default.data,
					}
				);
			}

			// add command to clients collection
			DiscordClient.addCommand(command);

			loadedCommands.push(command.default.name);
		}

		logger.client(`✅ Loaded ${loadedCommands.length} commands!`);
	}
}
