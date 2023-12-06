import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ComponentType,
} from "discord.js";
import { initEmbed, buttonsEmbed } from "../../template/embeds";
import SelectHandler from "../../handlers/selectMenu.handler";
import { buttonId } from "../../constants/customId";

export default {
	data: new SlashCommandBuilder()
		.setName("gitignore")
		.setDescription("Generate a gitignore file")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction: any) {
		const { embed, rows } = initEmbed();

		const reply = await interaction.reply({
			embeds: [embed],
			components: [rows, buttonsEmbed(false, interaction.user.id)],
			ephemeral: true,
		});

		const selectCollector = reply.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
			filter: (i: any) => i.user.id === interaction.user.id,
			time: 60_000 * 2,
		});

		const buttonCollector = reply.createMessageComponentCollector({
			componentType: ComponentType.Button || ComponentType.ActionRow,
			filter: (i: any) => i.user.id === interaction.user.id,
			time: 60_000 * 2,
		});

		const { id: uid } = interaction.user;

		const selectInstance = await new SelectHandler(reply).getInstances();
		selectCollector.on("collect", async (i: any) =>
			selectInstance.execute(i, uid)
		);

		selectCollector.on("end", async () => reply.delete());
		buttonCollector.on("collect", async (i: any) => {
			const { customId } = i;

			switch (customId) {
				case buttonId.reset:
					i.deferUpdate();
					selectInstance.Reset(uid);
					break;
				case buttonId.back:
					i.deferUpdate();
					selectInstance.SwitchMenu(customId, uid);
					break;
			}
		});
	},
};
