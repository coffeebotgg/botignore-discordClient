import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import GitIgnoreGenerator from "../../functions/generator";

export default {
	data: new SlashCommandBuilder()
		.setName("gitignore")
		.setDescription("Generate a gitignore file")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction: any) {
		await new GitIgnoreGenerator("initEmbed", interaction).init();
	},
};
