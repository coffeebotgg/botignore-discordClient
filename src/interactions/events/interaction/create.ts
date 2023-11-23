import { Events, Interaction } from "discord.js";
import logger from "../../../utils/logger";
import DiscordClient from "../../../apps/client";
import GitIgnoreGenerator from "../../../functions/generator";
import { errorEmbed } from "../../../template/embeds";

export default {
	name: Events.InteractionCreate,
	once: false,
	execute: async (interaction: Interaction) => {
		const commands = DiscordClient.getCommands();

		if (interaction.isChatInputCommand()) {
			if (!commands.has(interaction.commandName)) return;

			try {
				return await commands
					.get(interaction.commandName)
					.execute(interaction);
			} catch (error: any) {
				logger.error(error);
				return await interaction.reply({
					embeds: [errorEmbed],
					ephemeral: true,
				});
			}
		}

		if (interaction.isStringSelectMenu()) {
			try {
				const data = await new GitIgnoreGenerator(
					interaction.values[0],
					interaction
				).init();
				console.log(data);
			} catch (error: any) {
				logger.error(error);
				return await interaction.reply({
					embeds: [errorEmbed],
					ephemeral: true,
				});
			}
		}
	},
};
