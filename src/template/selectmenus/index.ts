import { StringSelectMenuBuilder } from "discord.js";
import { selectmenuId } from "../../constants/customId";

const selectMenu = new StringSelectMenuBuilder()
	.setCustomId(selectmenuId.select)
	.setPlaceholder("Select a color")
	.addOptions([
		{
			label: "Red",
			value: "red",
			description: "Red color",
		},
		{
			label: "Green",
			value: "green",
			description: "Green color",
		},
		{
			label: "Blue",
			value: "blue",
			description: "Blue color",
		},
	]);

export default selectMenu;
