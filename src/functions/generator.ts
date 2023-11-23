import {
	EmbedBuilder,
	ActionRowBuilder,
	AttachmentBuilder,
	StringSelectMenuBuilder,
} from "discord.js";
import { selectmenuId } from "../constants/customId";
import selectMenu from "../template/selectmenus";
import {
	initEmbed,
	errorEmbed,
	codeEmbed,
	applicationEmbed,
	frameworkEmbed,
	IDEEmbed,
	templatesEmbed,
} from "../template/embeds";
import HashTable from "./hashtable";

/**
 * @class GitIgnoreGenerator
 * @description This function will decide which selectMeny and embed template to use, based on parameter when called or a default value. Hashtable is used to store the data while the user is using the selectMenu.
 * @param {string} [selectMeny] - The selectMenu to use, set default to "initEmbed"
 * @param {string} [interaction] - The interaction object from the slash command so we can reply to the user and edit the message
 */
export default class GitIgnoreGenerator {
	private selectMenu: string;
	private interaction: any;
	private hashtable: HashTable;

	constructor(selectMenu: string = "initEmbed", interaction: any) {
		this.selectMenu = selectMenu;
		this.interaction = interaction;
		this.hashtable = new HashTable();
	}

	/**
	 * @method init
	 * @description This method will decide which selectMeny and embed template to use, based on parameter when called or a default value. Hashtable is used to store the data while the user is using the selectMenu.
	 */
	public init(): object {
		console.log(this.selectMenu);
		const { author, channel } = this.interaction;

		const component = new ActionRowBuilder();
		let embed;

		switch (this.selectMenu) {
			default:
				component.addComponents();
				embed = initEmbed;
				break;
		}

		return {
			embeds: [embed],
			components: [component],
			ephermal: true,
		};
	}
}
