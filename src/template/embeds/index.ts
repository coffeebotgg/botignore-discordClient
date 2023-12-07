import {
	EmbedBuilder,
	StringSelectMenuBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";
import { colors, emojis } from "../../constants/global";
import { selectmenuId, buttonId } from "../../constants/customId";
import env from "../../utils/env.process";
import { InitOptions } from "../selectMenu/options";

const error = new EmbedBuilder()
	.setDescription(`${emojis.error} Something went wrong! Try again later`)
	.setColor(colors.error as any);

const buttons = (backEnabled: boolean = false, uid: string) => {
	const buttons = new ActionRowBuilder();
	const Generate = new ButtonBuilder()
		.setCustomId(buttonId.generate)
		.setLabel("Generate")
		.setStyle(ButtonStyle.Primary);
	const Back = new ButtonBuilder()
		.setCustomId(buttonId.back)
		.setLabel("Back")
		.setStyle(ButtonStyle.Secondary)
		.setEmoji("◀️")
		.setDisabled(!backEnabled);
	const Reset = new ButtonBuilder()
		.setCustomId(buttonId.reset)
		.setLabel("Reset")
		.setStyle(ButtonStyle.Danger)
		.setEmoji("🗑️");

	buttons.addComponents(Generate, Back, Reset);

	return buttons;
};

const embedGen = (text: string, options: object[]) => {
	const embed = new EmbedBuilder()
		.setTitle("Gitignore")
		.setDescription(
			`
			${text}\n
			Select what you want to add to your gitignore.
			You can select multiple options.
		`
		)
		.addFields(
			options.map((option: any) => {
				return {
					name: "\u200b",
					value: option.label,
					inline: true,
				};
			})
		)
		.setColor(colors.success as any);

	return embed;
};

const init = () => {
	const embed = embedGen("Init Options", []);
	const rows = new ActionRowBuilder();
	const selectMenu = new StringSelectMenuBuilder()
		.setCustomId(selectmenuId.select)
		.setPlaceholder("Select template menu")
		.addOptions(InitOptions);
	rows.addComponents(selectMenu);

	return { embed, rows };
};

export {
	error as errorEmbed,
	init as initEmbed,
	embedGen,
	buttons as buttonsEmbed,
};
