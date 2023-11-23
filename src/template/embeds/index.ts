import { EmbedBuilder } from "discord.js";
import { colors, emojis } from "../../constants/global";

const init = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Gitignore template")
	.setColor(colors.success as any);
const error = new EmbedBuilder()
	.setDescription(`${emojis.error} Something went wrong! Try again later`)
	.setColor(colors.error as any);
const code = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Select a code")
	.setColor(colors.success as any);
const application = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Select an application")
	.setColor(colors.success as any);
const framework = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Select a framework")
	.setColor(colors.success as any);
const IDE = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Select an IDE")
	.setColor(colors.success as any);
const templates = new EmbedBuilder()
	.setTitle("Gitignore")
	.setDescription("Select a template")
	.setColor(colors.success as any);

export {
	init as initEmbed,
	error as errorEmbed,
	code as codeEmbed,
	application as applicationEmbed,
	framework as frameworkEmbed,
	IDE as IDEEmbed,
	templates as templatesEmbed,
};
