import {
	StringSelectMenuInteraction,
	StringSelectMenuBuilder,
	ActionRowBuilder,
} from "discord.js";
import { selectmenuId } from "../constants/customId";
import { IHashTableData } from "../interfaces/hashtable.interface";
import logger from "../utils/logger";
import { embedGen, buttonsEmbed } from "../template/embeds";
import RedisClient from "../Cache";

import {
	InitOptions,
	IDEOptions,
	TemplatesOptions,
	LanguageOptions,
	FrameworkOptions,
	ApplicationOptions,
} from "../template/selectMenu/options";

export default class SelectHandler {
	public instance: SelectHandler;
	private interaction: any;

	constructor(interaction: any) {
		this.interaction = interaction;
		this.instance = this;
	}

	public getInstances(): Promise<SelectHandler> {
		return new Promise((resolve, reject) => {
			try {
				resolve(this.instance);
			} catch (error: any) {
				reject(error);
			}
		});
	}

	public async execute(
		interaction: StringSelectMenuInteraction,
		uid: string
	) {
		try {
			interaction.deferUpdate();
			const { values, customId } = interaction;

			switch (customId) {
				case selectmenuId.select:
					this.SwitchMenu(values[0], uid);
					break;
				default:
					this.saveData(values, uid, customId);
					break;
			}
		} catch (error: any) {
			logger.error(error);
		}
	}

	private async saveData(values: string[], uid: string, customId: string) {
		try {
			const redis = new RedisClient();
			await redis.connect();

			const preview = (await redis.getById(
				uid
			)) as unknown as IHashTableData;

			const data: IHashTableData = {
				uid: uid,
				selections: {
					...preview?.selections,
					[customId]: values,
				},
				created_at: preview?.created_at,
				expires_at: preview?.expires_at,
			};

			// 1h expiration
			await redis.set(uid, data, 3600);
			await redis.disconnect();

			this.SwitchMenu(customId, uid);
		} catch (error: any) {
			logger.error(error);
		}
	}

	public async Reset(uid: string) {
		try {
			const redis = new RedisClient();
			await redis.connect();

			await redis.delete(uid);
			await redis.disconnect();

			this.SwitchMenu(selectmenuId.select, uid);
		} catch (error: any) {
			logger.error(error);
		}
	}

	public async SwitchMenu(value: string, uid: string) {
		try {
			let options: any[],
				embed: any,
				buttons: any,
				length: number,
				selectId: string,
				placeholder: string;

			switch (value) {
				case selectmenuId.IDE:
					options = IDEOptions;
					selectId = selectmenuId.IDE;
					embed = embedGen("IDE Options", options);
					buttons = buttonsEmbed(true, uid);
					length = IDEOptions.length;
					placeholder = "Select IDE plugins templates";
					break;
				case selectmenuId.templates:
					options = TemplatesOptions;
					selectId = selectmenuId.templates;
					embed = embedGen("Template Options", options);
					buttons = buttonsEmbed(true, uid);
					length = TemplatesOptions.length;
					placeholder = "Select general templates";
					break;
				case selectmenuId.language:
					options = LanguageOptions;
					selectId = selectmenuId.language;
					embed = embedGen("Language Options", options);
					buttons = buttonsEmbed(true, uid);
					length = LanguageOptions.length;
					placeholder = "Choose language templates";
					break;
				case selectmenuId.framework:
					options = FrameworkOptions;
					selectId = selectmenuId.framework;
					embed = embedGen("Framework Options", options);
					buttons = buttonsEmbed(true, uid);
					length = FrameworkOptions.length;
					placeholder = "Choose framework templates";
					break;
				case selectmenuId.apps:
					options = ApplicationOptions;
					selectId = selectmenuId.apps;
					embed = embedGen("Application Options", options);
					buttons = buttonsEmbed(true, uid);
					length = ApplicationOptions.length;
					placeholder = "Choose application templates";
					break;
				default:
					options = InitOptions;
					selectId = selectmenuId.select;
					embed = embedGen("Init Options", []);
					buttons = buttonsEmbed(false, uid);
					length = 1;
					placeholder = "Select template menu";
					break;
			}

			const selectMenu = new StringSelectMenuBuilder()
				.setCustomId(selectId)
				.setPlaceholder(placeholder)
				.setMaxValues(length)
				.addOptions(options);

			const row = new ActionRowBuilder().addComponents(selectMenu);

			this.interaction.edit({
				embeds: [embed],
				components: [row, buttons],
			});
		} catch (error: any) {
			logger.error(error);
		}
	}
}
