import {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	AttachmentBuilder,
} from "discord.js";
import { colors } from "../../constants/global";
import axios from "axios";
import fs from "fs";
import path from "path";
export default {
	data: new SlashCommandBuilder()
		.setName("gitignore")
		.setDescription("Generate a gitignore file")
		// add language options
		.addStringOption((option) =>
			option
				.setName("language")
				.setDescription("The language to generate a gitignore file for")
				.setRequired(true)
				.addChoices(
					{ name: "Node", value: "Node" },
					{ name: "Python", value: "Python" },
					{ name: "Java", value: "Java" },
					{ name: "C++", value: "C++" },
					{ name: "C", value: "C" },
					{ name: "C#", value: "C#" },
					{ name: "Go", value: "Go" },
					{ name: "Ruby", value: "Ruby" },
					{ name: "Kotlin", value: "Kotlin" },
					{ name: "Dart", value: "Dart" },
					{ name: "Lua", value: "Lua" },
					{ name: "Julia", value: "Julia" },
					{ name: "Perl", value: "Perl" },
					{ name: "Haskell", value: "Haskell" },
					{ name: "Elixir", value: "Elixir" }
				)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction: any) {
		const language = interaction.options.getString("language");

		const res = await axios.get(
			`https://www.toptal.com/developers/gitignore/api/${language}`
		);
		const fileData = res.data;
		const tempDir = path.join(__dirname, "../../temp");
		if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
		const tempFile = path.join(tempDir, `.gitignore-${language}`);
		fs.writeFileSync(tempFile, fileData);

		const attachment = new AttachmentBuilder(tempFile);
		const embed = new EmbedBuilder()
			.setDescription(
				`🤖 Here is a gitignore file for \`${language}\` as requested`
			)
			.setColor(colors.success as any);

		await interaction.reply({
			embeds: [embed],
			files: [attachment],
			ephemeral: true,
		});
	},
};
