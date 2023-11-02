import { Events, Interaction, EmbedBuilder } from "discord.js";
import logger from "../../../utils/logger";
import DiscordClient from "../../../apps/client";
import { colors, emojis } from "../../../constants/global";

// import MessageQueue, { getDisplayName } from "../../../constants/messageQueues";
// import MQ from "../../../MQ/connect";

export default {
	name: Events.InteractionCreate,
	once: false,
	execute: async (interaction: Interaction) => {
		const commands = DiscordClient.getCommands();

		if (interaction.isCommand()) {
			if (!commands.has(interaction.commandName)) return;

			try {
				return await commands
					.get(interaction.commandName)
					.execute(interaction);
			} catch (error: any) {
				logger.error(error);
				const embed = new EmbedBuilder()
					.setDescription(`${emojis.error} Something went wrong!`)
					.setColor(colors.error as any);
				return await interaction.reply({
					embeds: [embed],
					ephemeral: true,
				});
			}
		}
	},
};
